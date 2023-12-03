package com.bookhubx.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookhubx.entity.BookImage;
import com.bookhubx.entity.BookPDF;
import com.bookhubx.entity.Books;
import com.bookhubx.entity.Community;
import com.bookhubx.entity.ProfilePicture;
import com.bookhubx.entity.Users;
import com.bookhubx.service.BookService;

@RestController
@CrossOrigin(origins = "*")
public class BookController {

	BookService bookService;

	@Autowired
	public BookController(BookService bookService) {
		super();
		this.bookService = bookService;
	}

	@PostMapping("/author/book")
	ResponseEntity<Long> uploadBooks(@RequestBody Books books) throws IOException {

		Books book = new Books();

		book.setDescription(books.getDescription());
		book.setPublished(false);

		book.setGenres(books.getGenres());
		book.setTimeStamp(LocalDateTime.now());
		book.setTitle(books.getTitle());
		book.setImageLink(books.getImageLink());

		return new ResponseEntity<Long>(bookService.uploadBooks(book), HttpStatus.CREATED);
	}

	@PostMapping("author/bookpdf/{bookid}")
	ResponseEntity<Long> uploadFile(@PathVariable Long bookid, @RequestParam("file") MultipartFile file)
			throws IOException {
		byte[] data = file.getBytes();
		BookPDF bookPDF = new BookPDF();
		bookPDF.setName(file.getOriginalFilename());
		bookPDF.setPDF(data);
		Books books = bookService.getBookById(bookid);
		books.setBookPDF(bookPDF);
		return new ResponseEntity<Long>(bookService.uploadBooks(books), HttpStatus.OK);

	}

	@PostMapping("author/bookimage/{bookid}")
	ResponseEntity<Long> uploadFileImage(@PathVariable Long bookid, @RequestParam("image") MultipartFile image)
			throws IOException {
		byte[] data = image.getBytes();
		BookImage bookImage = new BookImage();
		bookImage.setImage(data);

		Books books = bookService.getBookById(bookid);
		books.setBookImage(bookImage);
		return new ResponseEntity<Long>(bookService.uploadBooks(books), HttpStatus.OK);
	}

	@GetMapping("/author/books")
	ResponseEntity<List<Books>> getAuthorBooks() {

		return new ResponseEntity<List<Books>>(bookService.getAuthorBooks(), HttpStatus.OK);

	}

	@PatchMapping("/author/bookpublish/{id}")
	ResponseEntity<String> publishBook(@PathVariable Long id) {
		return new ResponseEntity<String>(bookService.publishBook(id), HttpStatus.OK);
	}

	@PatchMapping("/author/bookunpublish/{id}")
	ResponseEntity<String> unPublishBook(@PathVariable Long id) {
		return new ResponseEntity<String>(bookService.unpublishBook(id), HttpStatus.OK);
	}

	@DeleteMapping("/author/deletebook/{id}")
	ResponseEntity<String> deleteBook(@PathVariable Long id) {
		return new ResponseEntity<String>(bookService.deleteBook(id), HttpStatus.OK);
	}

	@GetMapping("/publishedbooks")
	ResponseEntity<List<Books>> getPublishedBooks() {
		return new ResponseEntity<List<Books>>(bookService.getPublishedBook(), HttpStatus.OK);
	}

	@GetMapping("/paged")
	public ResponseEntity<Page<Books>> getPagedItems(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {

		if (page < 0) {
			page = 0;

		} else if (page > 0) {
			page = page - 1;
		}
		Page<Books> items = bookService.getPagedItems(PageRequest.of(page, size));
		return ResponseEntity.ok(items);
	}

	@GetMapping("/book/{id}")
	ResponseEntity<Books> getBookById(@PathVariable Long id) {
		return new ResponseEntity<Books>(bookService.getBookById(id), HttpStatus.OK);
	}

	@GetMapping("/downloadpdf/{id}")
	public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Long id) throws Exception {

		BookPDF pdfFile = bookService.getPdfFile(id);

		if (pdfFile != null) {
			// Create a ByteArrayResource from the file data
			ByteArrayResource resource = new ByteArrayResource(pdfFile.getPDF());

			// Build the response with the PDF file data
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + pdfFile.getName())
					.contentType(MediaType.APPLICATION_PDF).contentLength(pdfFile.getPDF().length).body(resource);
		} else {
			// Handle file not found
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/booklist")
	ResponseEntity<List<Books>> getAllBooks(){
		return new ResponseEntity<List<Books>>(bookService.getAllBooks(), HttpStatus.OK);
	}
	

}
