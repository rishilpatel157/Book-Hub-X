package com.bookhubx.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bookhubx.entity.Books;
import com.bookhubx.entity.ChatBot;
import com.bookhubx.entity.Users;
import com.bookhubx.repository.BookRepository;
import com.bookhubx.repository.ChatBotRepository;
import com.bookhubx.repository.UsersRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ChatBotServiceImpl implements ChatBotService {

	@Value("${api.openai.secretkey}")
	private String secretKey;

	@Value("${api.openai.url}")
	private String url;

	ObjectMapper objectMapper;
	HttpHeaders httpHeaders;
	ChatBotRepository chatBotRepository;
	UsersRepository usersRepository;
	RestTemplate restTemplate;
	BookRepository bookRepository;


@Autowired
	public ChatBotServiceImpl( ObjectMapper objectMapper, HttpHeaders httpHeaders,
			ChatBotRepository chatBotRepository, UsersRepository usersRepository, RestTemplate restTemplate,
			BookRepository bookRepository) {
		super();
		this.objectMapper = objectMapper;
		this.httpHeaders = httpHeaders;
		this.chatBotRepository = chatBotRepository;
		this.usersRepository = usersRepository;
		this.restTemplate = restTemplate;
		this.bookRepository = bookRepository;
	}



	@Override
	public String userPrompt(String message) throws Exception {

		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		httpHeaders.set("Authorization", "Bearer " + secretKey);

		Map<String, String> userRole = new HashMap<>();
		userRole.put("role", "user");
		userRole.put("content", message);

	    List<Books> bookList  = bookRepository.findAll();
		
	    String books = "";
	    for(int i = 0;i< bookList.size() ;i++) {
	    	books += (i+1)+" :"+ bookList.get(i).getAuthor().getFirstName()+" - "+bookList.get(i).getTitle()+" - "+bookList.get(i).getGenres()+" link : http://localhost:4200/viewreader/"+bookList.get(i).getId()+"."; 
	    }
	    
	    
	    
		Map<String, String> systemRole = new HashMap<>();
		systemRole.put("role", "system");
		systemRole.put("content", "act as chatbot bookhubx website this are the books with author name,book name and genre with link give customer proper response with link below are the books -"+books);
		

		List<Map<String, String>> messages = new ArrayList<>();
		messages.add(systemRole);
		messages.add(userRole);
		

		Body body = new Body("gpt-3.5-turbo", messages, 1000, 0.7, 0.9, 1.0, 1.0);

		HttpEntity<String> requestEntity = new HttpEntity<>(objectMapper.writeValueAsString(body), httpHeaders);
		ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);
		
		String customerEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(customerEmail)
				.orElseThrow(() -> new Exception("Invalid Email"));
		
		JsonNode responseJson = objectMapper.readTree(responseEntity.getBody());
		String response = responseJson.get("choices").get(0).get("message").get("content").asText();

		
		ChatBot chatBot = new ChatBot();
		chatBot.setInput(message);

		chatBot.setOutput(response);

		chatBot.setReaders(user);
		return response;
	}

}
