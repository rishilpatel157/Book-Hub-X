package com.bookhubx.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import com.bookhubx.entity.Users;
import com.bookhubx.exception.UserNotFoundException;
import com.bookhubx.repository.UsersRepository;

@Service
public class UsersServiceImpl implements UsersService {
	
	UsersRepository usersRepository;
	
	
	

	@Autowired
	public UsersServiceImpl(UsersRepository usersRepository) {
		super();
		this.usersRepository = usersRepository;
	}





	@Override
	public String addCustomer(Users customer) {
		 usersRepository.save(customer);
		return "Registered Successfully";
	}





	@Override
	public Users findByEmail(String email) {
		return usersRepository.findByEmail(email).orElseThrow( ()-> new UserNotFoundException("User Not Found"));
	}





	@Override
	public Users getUser() {
		String email= (String)	SecurityContextHolder.getContext().getAuthentication().getPrincipal();

	 return usersRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundException("Invalid Email") );
	
	}





	@Override
	public byte[] getProfilePicture() {
		String email= (String)	SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	Users user = usersRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundException("Invalid Email") );
		  byte[] profilePictureData = user.getProfilePicture().getProfilePicture();
		  

	      
	        return profilePictureData;
	}

}
