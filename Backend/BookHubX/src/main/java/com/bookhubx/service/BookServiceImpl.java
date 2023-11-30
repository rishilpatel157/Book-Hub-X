package com.bookhubx.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bookhubx.entity.Books;
import com.bookhubx.entity.Users;
import com.bookhubx.exception.UserNotFoundException;
import com.bookhubx.repository.BookRepository;
import com.bookhubx.repository.UsersRepository;

@Service
public class BookServiceImpl implements BookService {

	BookRepository bookRepository;
	UsersRepository usersRepository;

	@Autowired
	public BookServiceImpl(BookRepository bookRepository, UsersRepository usersRepository) {
		super();
		this.bookRepository = bookRepository;
		this.usersRepository = usersRepository;
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

}
