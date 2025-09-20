package com.JobZilla.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.JobZilla.entity.Profile;

public interface ProfileRepository extends MongoRepository<Profile, Long> {
    
}