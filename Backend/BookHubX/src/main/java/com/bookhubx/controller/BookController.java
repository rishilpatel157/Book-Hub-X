package com.bookhubx.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookhubx.entity.BookImage;
import com.bookhubx.entity.BookPDF;
import com.bookhubx.entity.Books;
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
		System.out.println(books);
		return new ResponseEntity<Long>(bookService.uploadBooks(books), HttpStatus.OK);
	}
	
	@GetMapping("/author/books")
	ResponseEntity<List<Books>> getAuthorBooks(){
		
		return new ResponseEntity<List<Books>>(bookService.getAuthorBooks(), HttpStatus.OK);
		
	}

}
