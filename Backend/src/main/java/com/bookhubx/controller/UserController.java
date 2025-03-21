package com.bookhubx.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import com.bookhubx.service.UserServiceDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookhubx.entity.Authority;
import com.bookhubx.entity.ProfilePicture;
import com.bookhubx.entity.Users;
import com.bookhubx.repository.ProfilePictureRepository;
import com.bookhubx.service.UsersService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

	UsersService usersService;
	PasswordEncoder passwordEncoder;
	ProfilePictureRepository picture;

	@Autowired
	public UserController(UsersService usersService, PasswordEncoder passwordEncoder,
			ProfilePictureRepository picture) {
		super();
		this.usersService = usersService;
		this.passwordEncoder = passwordEncoder;
		this.picture = picture;
	}

	@PostMapping("/users")
	ResponseEntity<String> addCustomer(@Valid @RequestBody Users user) {

		try {

			Users users = convertToUsersEntity(user);

			String encodedPassword = passwordEncoder.encode(users.getPassword());
			users.setPassword(encodedPassword);

			return new ResponseEntity<String>(usersService.addCustomer(users), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>(
					"redirect:/error" + e.getLocalizedMessage() + "-" + e.getLocalizedMessage(),
					HttpStatus.BAD_GATEWAY);
		}
	}

	@PostMapping("/upload/{email}")
	ResponseEntity<String> uploadFile(@PathVariable String email, @RequestParam("file") MultipartFile file) {

		try {
			Users user = usersService.findByEmail(email);

			byte[] data = file.getBytes();
			ProfilePicture proPicture = new ProfilePicture();
			picture.save(proPicture);

			user.setProfilePicture(proPicture);
			user.getProfilePicture().setProfilePicture(data);
			return new ResponseEntity<String>(usersService.addCustomer(user), HttpStatus.OK);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<String>("redirect:/error" + e.getLocalizedMessage(), HttpStatus.BAD_GATEWAY);
		}
	}

	@GetMapping("/signIn")
	public ResponseEntity<Users> getLoggedInCustomerDetailsHandler(Authentication auth) {

		Users customer = usersService.findByEmail(auth.getName());




		return new ResponseEntity<Users>(customer, HttpStatus.OK);
	}

	private Users convertToUsersEntity(Users userRequest) {
		Users newUser = new Users();

		newUser.setFirstName(userRequest.getFirstName());
		newUser.setLastName(userRequest.getLastName());
		newUser.setEmail(userRequest.getEmail());
		newUser.setPassword(userRequest.getPassword());

		// Set other fields
		newUser.setActive(true);
		newUser.setTimeStamp(LocalDateTime.now());

		// Create a new ProfilePicture entity and set it to the user

		// Create a new Authority entity based on the selected role

		Authority authority = new Authority();

		switch (userRequest.getAuthority().get(0).getRole()) {
		case "Reader":
			authority.setRole("ROLE_READER");
			break;
		case "Author":
			authority.setRole("ROLE_AUTHOR");
			break;
		case "admin":
			authority.setRole("ROLE_ADMIN");
			break;
		default:
			// Handle the case where the role is not recognized
			// You might throw an exception or set a default role
			break;
		}

		// Set the user for the authority

		// Add the authority to the list of authorities
		newUser.getAuthority().add(authority);

		return newUser;
	}

	@GetMapping("/user")
	ResponseEntity<Users> getUser() {
		return new ResponseEntity<Users>(usersService.getUser(), HttpStatus.OK);
	}

	@GetMapping("/profile-picture")
	public ResponseEntity<byte[]> getProfilePicture() {
		// Retrieve the profile picture data from your service
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG); // Set the appropriate content type
		return new ResponseEntity<>(usersService.getProfilePicture(), headers, HttpStatus.OK);
	}

}
