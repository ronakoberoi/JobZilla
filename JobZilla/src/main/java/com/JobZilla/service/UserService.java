package com.JobZilla.service;

import com.JobZilla.dto.LoginDTO;
import com.JobZilla.dto.ResponseDTO;
import com.JobZilla.dto.UserDTO;
import com.JobZilla.exception.JobZillaException;




public interface UserService {
	public UserDTO registerUser(UserDTO userDTO) throws JobZillaException;

	public UserDTO loginUser(LoginDTO loginDTO) throws JobZillaException;

	public Boolean sendOtp(String email) throws Exception;

	public Boolean verifyOtp(String email, String otp) throws JobZillaException;

	public ResponseDTO changePassword(LoginDTO loginDTO) throws JobZillaException;
}