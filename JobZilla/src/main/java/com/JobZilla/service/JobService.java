package com.JobZilla.service;

import java.util.List;

import com.JobZilla.dto.JobDTO;
import com.JobZilla.exception.JobZillaException;

public interface JobService{
    public JobDTO postJob(JobDTO jobDTO) throws JobZillaException;

    public List<JobDTO> getAllJobs();

    public JobDTO getJob(Long id) throws JobZillaException;

}
