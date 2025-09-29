package com.JobZilla.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobZilla.dto.ApplicantDTO;
import com.JobZilla.dto.Application;
import com.JobZilla.dto.ApplicationStatus;
import com.JobZilla.dto.JobDTO;
import com.JobZilla.entity.Applicant;
import com.JobZilla.entity.Job;
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
        return jobRepository.findById(id).orElseThrow(()->new JobZillaException("JOB_NOT_FOUND")).toDTO();
    }
    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobZillaException {
        Job job = jobRepository.findById(id).orElseThrow(()->new 
        JobZillaException("JOB_NOT_FOUND"));
        List<Applicant> applicants = job.getApplicants();
        if(applicants==null)applicants=new ArrayList<>();
        if(applicants.stream().filter((x)->
        x.getApplicantId()==applicantDTO.getApplicantId()).toList().size()>0) throw new 
        JobZillaException("JOB_ALREADY_APPLIED");
        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }
    @Override
    public List<JobDTO> getJobsPostedBy(Long id) {
        return jobRepository.findByPostedBy(id).stream().map((x)->x.toDTO()).toList();
    }
    @Override
    public void changeAppStatus(Application application) throws JobZillaException {
        Job job = jobRepository.findById(application.getId()).orElseThrow(()->new 
        JobZillaException("JOB_NOT_FOUND"));
        List<Applicant> applicants = job.getApplicants().stream().map((x)->{
            if(application.getApplicantId()==x.getApplicantId()) {
                x.setApplicationStatus(application.getApplicationStatus());
                if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING))x.setInterviewTime(application.getInterviewTime());
            }
            return x;
        }).toList();
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

}