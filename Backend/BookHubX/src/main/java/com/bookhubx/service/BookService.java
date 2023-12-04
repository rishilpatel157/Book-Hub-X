package com.bookhubx.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bookhubx.entity.BookPDF;
import com.bookhubx.entity.Books;

public interface BookService {

	Long uploadBooks(Books book);

	Books getBookById(Long id);

	List<Books> getAuthorBooks();

	List<byte[]> getBookImage();

	String publishBook(Long id);

	String unpublishBook(Long id);

	String deleteBook(Long id);

	List<Books> getPublishedBook();

	Page<Books> getPagedItems(Pageable pageable);
	Page<Books> getAuthorPagedItems(Pageable pageable);


	BookPDF getPdfFile(Long id) throws Exception;
	
	List<Books> getAllBooks();

}
