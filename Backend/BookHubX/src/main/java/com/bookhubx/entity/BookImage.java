package com.bookhubx.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Entity
@Data
public class BookImage {
	

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	
	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] image;
	
	

}
