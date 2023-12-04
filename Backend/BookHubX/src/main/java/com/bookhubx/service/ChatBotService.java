package com.bookhubx.service;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface ChatBotService {
	
	String userPrompt(String message) throws JsonProcessingException, Exception;

}
