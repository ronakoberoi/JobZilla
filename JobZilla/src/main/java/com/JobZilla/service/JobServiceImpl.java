package com.JobZilla.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobZilla.dto.JobDTO;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.repository.JobRepository;
import com.JobZilla.utility.Utilities;

@Service("jobService")
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;
    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobZillaException {
        jobDTO.setId(Utilities.getNextSequence("jobs"));
        jobDTO.setPostTime(LocalDateTime.now());
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }
    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }
    @Override
    public JobDTO getJob(Long id) throws JobZillaException {
        return jobRepository.findById(id).orElseThrow(()->new JobZillaException("Job_Not_Found")).toDTO();
    }

}