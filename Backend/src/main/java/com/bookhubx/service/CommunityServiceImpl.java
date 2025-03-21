package com.bookhubx.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bookhubx.entity.Books;
import com.bookhubx.entity.Community;
import com.bookhubx.entity.Discussion;
import com.bookhubx.entity.Users;
import com.bookhubx.exception.UserNotFoundException;
import com.bookhubx.repository.BookRepository;
import com.bookhubx.repository.CommunityRepository;
import com.bookhubx.repository.DiscussionRepository;
import com.bookhubx.repository.UsersRepository;

@Service
public class CommunityServiceImpl implements CommunityService {

	CommunityRepository communityRepository;
	BookRepository bookRepository;
	UsersRepository usersRepository;
	DiscussionRepository discussionRepository;

	@Autowired
	public CommunityServiceImpl(CommunityRepository communityRepository, BookRepository bookRepository,
			UsersRepository usersRepository, DiscussionRepository discussionRepository) {
		super();
		this.communityRepository = communityRepository;
		this.bookRepository = bookRepository;
		this.usersRepository = usersRepository;
		this.discussionRepository = discussionRepository;
	}

	@Override
	public List<Community> getCommunityList() {
		return communityRepository.findAll();
	}

	@Override
	public Community getCommunityById(Long id) {
		return communityRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Invalid ID"));
	}

	@Override
	public String createCommunity(String title, Long id) {
		// TODO Auto-generated method stub
		Community community = new Community();
		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));
		Books book = bookRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Invalid ID"));

		List<Users> members = new ArrayList<>();
		members.add(user);

		community.setTitle(title);
		community.setCreator(user);
		community.setMembers(members);
		community.setBook(book);
		community.setCreateAt(LocalDateTime.now());

		Discussion discussion = new Discussion();
		discussion.setCreateAt(LocalDateTime.now());
		discussion.setCreator(user);
		discussion.setMessage(user.getFirstName().toUpperCase() + " has created");
		discussion.setStatus("created");
		discussionRepository.save(discussion);

		List<Discussion> discussions = new ArrayList<>();
		discussions.add(discussion);
		community.setDiscussions(discussions);

		discussion.setCommunity(community);
		communityRepository.save(community);

		return "Successfully Created";
	}

	@Override
	public Page<Community> getPagedItems(Pageable pageable) {
		System.out.println(pageable);
		List<Community> community = communityRepository.findAll();
		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		for (int i = 0; i < community.size(); i++) {
			for (int j = 0; j < community.get(i).getMembers().size(); j++) {
				if (user.getId() == community.get(i).getMembers().get(j).getId()) {
					community.get(i).setMember(true);
				} else {
					community.get(i).setMember(false);

				}
			}
		}

		int start = (int) pageable.getOffset();
		int end = (start + pageable.getPageSize()) > community.size() ? community.size()
				: (start + pageable.getPageSize());

		return new PageImpl<>(community.subList(start, end),
				PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()), community.size());

	}

	@Override
	public Community joinCommunity(Long id) {
		Community community = communityRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		List<Users> members = community.getMembers();
		members.add(user);
		community.setMembers(members);

		Discussion discussion = new Discussion();
		discussion.setCreateAt(LocalDateTime.now());
		discussion.setMessage(user.getFirstName().toUpperCase() + " has Joined");
		discussion.setStatus("joined");
		discussion.setCreator(user);

		discussionRepository.save(discussion);

		List<Discussion> discussionList = community.getDiscussions();
		discussionList.add(discussion);
		community.setDiscussions(discussionList);

		communityRepository.save(community);

		return community;

	}

	@Override
	public Community sendMessage(Long id, String message) {
		Community community = communityRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));
		Discussion discussion = new Discussion();
		discussion.setCreateAt(LocalDateTime.now());
		discussion.setMessage(message);
		discussion.setStatus("message");
		discussion.setCreator(user);
		discussion.setSide("right");

		discussion.setCommunity(community);

		discussionRepository.save(discussion);

		List<Discussion> discussions = community.getDiscussions();
		discussions.add(discussion);
		community.setDiscussions(discussions);

		communityRepository.save(community);

		return community;

	}

	@Override
	public Community getMessageById(Long id) {
		Community communitys = communityRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Invalid Email"));
		String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Invalid Email"));

		List<Discussion> discussions = communitys.getDiscussions();
		for (int i = 0; i < discussions.size(); i++) {
			if (!discussions.get(i).getStatus().equals("joined")) {
				if (discussions.get(i).getCreator().getId() == user.getId()) {
					discussions.get(i).setSide("right");
				} else {
					discussions.get(i).setSide("left");
				}
			}
			else
			{
				discussions.get(i).setSide("middle");
			}
		}

		communityRepository.save(communitys);
		return communitys;

	}

}
