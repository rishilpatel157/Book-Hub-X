package com.bookhubx.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bookhubx.entity.Books;
import com.bookhubx.entity.Community;
import com.bookhubx.entity.Discussion;

public interface CommunityService {
	
	String createCommunity(String title,Long  id);

	List<Community> getCommunityList();
	
	Community getCommunityById(Long id);
	Page<Community> getPagedItems(Pageable pageable);
	
	Community joinCommunity(Long id);
	
  public	Community sendMessage(Long id,String message);
	
	Community getMessageById(Long id);

}
