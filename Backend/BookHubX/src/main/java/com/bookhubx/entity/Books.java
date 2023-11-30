package com.bookhubx.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Books {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;

	private String title;
	
	private String description;
	
	private LocalDateTime timeStamp;
	
	private String imageLink;

    private String genres;

	@OneToOne(cascade = CascadeType.ALL)
	private BookPDF bookPDF;
	
	@OneToOne(cascade = CascadeType.ALL)
	private BookImage bookImage;
	
	private boolean isPublished;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Users author;
	

}
