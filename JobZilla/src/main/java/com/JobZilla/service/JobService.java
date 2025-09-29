package com.JobZilla.service;

import java.util.List;

import com.JobZilla.dto.ApplicantDTO;
import com.JobZilla.dto.Application;
import com.JobZilla.dto.JobDTO;
import com.JobZilla.exception.JobZillaException;

public interface JobService{
    public JobDTO postJob(JobDTO jobDTO) throws JobZillaException;

    public List<JobDTO> getAllJobs();

    public JobDTO getJob(Long id) throws JobZillaException;

    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobZillaException;

    public List<JobDTO> getJobsPostedBy(Long id);

    public void changeAppStatus(Application application) throws JobZillaException;

}
