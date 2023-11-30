package com.bookhubx.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;

	private String firstName;

	private String lastName;

	@Column(unique = true)
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;


	private LocalDateTime timeStamp;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_picture_id", referencedColumnName = "id")
	private ProfilePicture profilePicture;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Authority> authority = new ArrayList<>();

	private boolean isActive;
	


}
