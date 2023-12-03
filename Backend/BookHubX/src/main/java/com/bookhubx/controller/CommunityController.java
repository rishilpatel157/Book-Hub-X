package com.bookhubx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookhubx.entity.Books;
import com.bookhubx.entity.Community;
import com.bookhubx.entity.Discussion;
import com.bookhubx.service.CommunityService;

@RestController
@CrossOrigin(origins = "*")
public class CommunityController {

	CommunityService communityService;

	@Autowired
	public CommunityController(CommunityService communityService) {
		super();
		this.communityService = communityService;
	}

	@PostMapping("/community/{id}")
	ResponseEntity<String> createCommunity(@RequestBody String title, @PathVariable Long id) {
		return new ResponseEntity<String>(communityService.createCommunity(title, id), HttpStatus.CREATED);
	}

	@GetMapping("/communitylist")
	ResponseEntity<List<Community>> getCommunityList() {
		return new ResponseEntity<List<Community>>(communityService.getCommunityList(), HttpStatus.OK);
	}

	@GetMapping("/communitybyid/{id}")
	ResponseEntity<Community> getCommunityById(@PathVariable Long id) {
		return new ResponseEntity<Community>(communityService.getCommunityById(id), HttpStatus.OK);
	}

	@GetMapping("/community/pages")
	ResponseEntity<Page<Community>> getPagedItems(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {

		if (page < 0) {
			page = 0;

		} else if (page > 0) {
			page = page - 1;
		}
		Page<Community> items = communityService.getPagedItems(PageRequest.of(page, size));
		System.out.println(items);
		return ResponseEntity.ok(items);
	}

	@GetMapping("/communityjoin/{id}")
	ResponseEntity<Community> joinCommunity(@PathVariable Long id) {

		return new ResponseEntity<Community>(communityService.joinCommunity(id), HttpStatus.OK);
	}

	@PostMapping("/communitydiscussion/{id}")
	ResponseEntity<Community> sendMessage(@PathVariable Long id, @RequestBody String message) {
		return new ResponseEntity<Community>(communityService.sendMessage(id, message), HttpStatus.OK);
	}

	@GetMapping("/communityallMessage/{id}")
	ResponseEntity<Community> getCommunityMessageById(@PathVariable Long id) {
		return new ResponseEntity<Community>(communityService.getMessageById(id), HttpStatus.OK);
	}

}
