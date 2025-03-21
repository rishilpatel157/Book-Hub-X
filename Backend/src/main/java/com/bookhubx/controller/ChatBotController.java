package com.bookhubx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookhubx.service.ChatBotService;

@RestController
@CrossOrigin(origins = "*")
public class ChatBotController {

	ChatBotService chatBotService;

	@Autowired
	public ChatBotController(ChatBotService chatBotService) {
		super();
		this.chatBotService = chatBotService;
	}
	
	@GetMapping("/prompt/{message}")
	ResponseEntity<String> userPrompt(@PathVariable String message) throws Exception {

		return new ResponseEntity<String>(chatBotService.userPrompt(message), HttpStatus.OK);

	}
	
	
	
	
}
