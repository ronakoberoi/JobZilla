package com.JobZilla.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobZilla.dto.UserDTO;
import com.JobZilla.entity.User;
import com.JobZilla.repository.UserRepository;


@Service(value="userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDTO registerUser(UserDTO userDTO) {
		User user= userDTO.toEntity();
		user=userRepository.save(user);
		return user.toDTO();
	}
	
}