package com.bookhubx.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bookhubx.entity.Authority;
import com.bookhubx.entity.Users;
import com.bookhubx.exception.UserNotFoundException;
import com.bookhubx.repository.UsersRepository;

@Service
public class UserServiceDetails implements UserDetailsService {

	UsersRepository usersRepository;

	@Autowired
	public UserServiceDetails(UsersRepository usersRepository) {
		super();
		this.usersRepository = usersRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<Users> opt = usersRepository.findByEmail(username);

		Users users = null;
		try {
			users = opt.orElseThrow(()  -> new UserNotFoundException("Email is Invalid"));
		} catch (UserNotFoundException e) {
			e.printStackTrace();
		}

		List<Authority> auths = users.getAuthority();
		List<GrantedAuthority> authorities = new ArrayList<>();

		for (Authority auth : auths) {
			SimpleGrantedAuthority sga = new SimpleGrantedAuthority(auth.getRole());
			authorities.add(sga);
		}

		return new User(users.getEmail(), users.getPassword(), authorities);

	}

}
