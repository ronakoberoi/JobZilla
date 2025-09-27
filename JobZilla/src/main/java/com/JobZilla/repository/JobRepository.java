package com.JobZilla.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.JobZilla.entity.Job;

public interface JobRepository extends MongoRepository<Job, Long> {

    Job save(Job dto);
    
}
