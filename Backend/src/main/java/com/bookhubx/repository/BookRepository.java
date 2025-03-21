package com.bookhubx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookhubx.entity.Books;

@Repository
public interface BookRepository extends JpaRepository<Books, Long>{

}
