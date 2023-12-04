package com.bookhubx.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bookhubx.entity.BookPDF;
import com.bookhubx.entity.Books;
import com.bookhubx.entity.Users;
import com.bookhubx.exception.UserNotFoundException;
import com.bookhubx.repository.BookPDFRepository;
import com.bookhubx.repository.BookRepository;
import com.bookhubx.repository.UsersRepository;

@Service
public class BookServiceImpl implements BookService {

	BookRepository bookRepository;
	UsersRepository usersRepository;
	BookPDFRepository bookPDFRepository;

	@Autowired
	public BookServiceImpl(BookRepository bookRepository, UsersRepository usersRepository,
			BookPDFRepository bookPDFRepository) {
		super();
		this.bookRepository = bookRepository;
		this.usersRepository = usersRepository;
		this.bookPDFRepository = bookPDFRepository;
	}

	@Override
	public Long uploadBooks(Books book) {
		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		book.setAuthor(user);
		bookRepository.save(book);
		return book.getId();
	}

	@Override
	public Books getBookById(Long id) {
		return bookRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Invalid ID"));
	}

	@Override
	public List<Books> getAuthorBooks() {

		List<Books> bookList = bookRepository.findAll();

		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		List<Books> authorBooks = new ArrayList<>();
		for (int i = 0; i < bookList.size(); i++) {
			if (bookList.get(i).getAuthor().getId() == user.getId()) {
				authorBooks.add(bookList.get(i));
			}

		}

		return authorBooks;

	}

	@Override
	public List<byte[]> getBookImage() {
		// TODO Auto-generated method stub
		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		List<Books> bookList = bookRepository.findAll();

		List<Books> authorBooks = new ArrayList<>();

		for (int i = 0; i < bookList.size(); i++) {
			if (bookList.get(i).getAuthor().getId() == user.getId()) {
				authorBooks.add(bookList.get(i));
			}
		}

		List<byte[]> byteList = new ArrayList<>();

		for (int i = 0; i < authorBooks.size(); i++) {
			byteList.add(authorBooks.get(i).getBookImage().getImage());
		}

		return byteList;
	}

	@Override
	public String publishBook(Long id) {
		// TODO Auto-generated method stub

		Books book = bookRepository.getReferenceById(id);

		book.setPublished(true);

		bookRepository.save(book);
		return "Published";
	}

	@Override
	public String unpublishBook(Long id) {
		Books book = bookRepository.getReferenceById(id);
		book.setPublished(false);

		bookRepository.save(book);
		return "Unpublished";

	}

	@Override
	public String deleteBook(Long id) {
		Books book = bookRepository.getReferenceById(id);

		bookRepository.delete(book);
		return "Book Deleted";
	}

	@Override
	public List<Books> getPublishedBook() {
		List<Books> bookList = bookRepository.findAll().stream().filter(book -> book.isPublished() == true).toList();
		return bookList;

	}

	@Override
	public Page<Books> getPagedItems(Pageable pageable) {
		List<Books> allBooks = bookRepository.findAll();

		List<Books> filteredBooks = allBooks.stream().filter(Books::isPublished).collect(Collectors.toList());

		int start = (int) pageable.getOffset();
		int end = (start + pageable.getPageSize()) > filteredBooks.size() ? filteredBooks.size()
				: (start + pageable.getPageSize());

		return new PageImpl<>(filteredBooks.subList(start, end),
				PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()), filteredBooks.size());
	}

	@Override
	public BookPDF getPdfFile(Long id) throws Exception {
		// TODO Auto-generated method stub
		return bookPDFRepository.findById(id).orElseThrow(() -> new Exception("Invalid ID"));
	}

	@Override
	public List<Books> getAllBooks() {
		// TODO Auto-generated method stub
		return bookRepository.findAll();
	}

	@Override
	public Page<Books> getAuthorPagedItems(Pageable pageable) {

		List<Books> allBooks = bookRepository.findAll();
		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));

System.out.println(user);
		List<Books> filteredBooks = allBooks.stream().filter( book -> book.getAuthor().getId() == user.getId()).collect(Collectors.toList());
System.out.println(filteredBooks);
		int start = (int) pageable.getOffset();
		int end = (start + pageable.getPageSize()) > filteredBooks.size() ? filteredBooks.size()
				: (start + pageable.getPageSize());

		return new PageImpl<>(filteredBooks.subList(start, end),
				PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()), filteredBooks.size());
	
	}

}
