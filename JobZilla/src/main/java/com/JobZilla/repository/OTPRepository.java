package com.JobZilla.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.JobZilla.entity.OTP;

public interface OTPRepository extends MongoRepository<OTP, String>{
	
}