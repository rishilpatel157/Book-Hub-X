package com.bookhubx.service;

import java.util.List;

import com.bookhubx.entity.Books;

public interface BookService {
	
	Long uploadBooks(Books book);
	Books getBookById(Long id);
	List<Books> getAuthorBooks();

}
