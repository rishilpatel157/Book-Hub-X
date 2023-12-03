package com.bookhubx.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Community {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	
	private String title;
	
	@ManyToOne
	private Users creator; 
	
	private LocalDateTime createAt;
	
	private boolean isMember;
	
	@OneToMany
	private List<Discussion> discussions;

	@ManyToMany
    private List<Users> members;
	
	@ManyToOne
    private Books book;
	
}
