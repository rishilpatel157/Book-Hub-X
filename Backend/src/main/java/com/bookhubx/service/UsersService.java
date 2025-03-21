package com.bookhubx.service;

import com.bookhubx.entity.Users;

public interface UsersService {
	
	String addCustomer(Users customer);

	Users findByEmail(String email);
	
	Users getUser();
	
	byte[] getProfilePicture();
}
