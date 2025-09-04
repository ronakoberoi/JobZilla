package com.JobZilla.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.JobZilla.entity.User;

public interface UserRepository extends MongoRepository<User, String> {

}