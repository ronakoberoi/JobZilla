package com.JobZilla.service;

import com.JobZilla.dto.ApplicantDTO;
import com.JobZilla.dto.Application;
import com.JobZilla.dto.ApplicationStatus;
import com.JobZilla.dto.JobDTO;
import com.JobZilla.dto.JobStatus;
import com.JobZilla.dto.NotificationDTO;
import com.JobZilla.entity.Applicant;
import com.JobZilla.entity.Job;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JobServiceImplTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private JobServiceImpl jobService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testPostJob_NewJob() throws JobZillaException {
        JobDTO jobDTO = mock(JobDTO.class);
        when(jobDTO.getId()).thenReturn(0L);
        when(jobDTO.getJobTitle()).thenReturn("Developer");
        when(jobDTO.getCompany()).thenReturn("TestCorp");
        when(jobDTO.getPostedBy()).thenReturn(1L);
        when(jobDTO.getJobStatus()).thenReturn(JobStatus.ACTIVE);
        Job job = mock(Job.class);
        JobDTO savedDTO = mock(JobDTO.class);

        when(jobDTO.toEntity()).thenReturn(job);
        when(jobRepository.save(job)).thenReturn(job);
        when(job.toDTO()).thenReturn(savedDTO);

        JobDTO result = jobService.postJob(jobDTO);
        assertEquals(savedDTO, result);
        verify(notificationService, times(1)).sendNotification(any(NotificationDTO.class));
        verify(jobRepository, times(1)).save(job);
    }

    @Test
    void testPostJob_UpdateExistingJob() throws JobZillaException {
        JobDTO jobDTO = mock(JobDTO.class);
        when(jobDTO.getId()).thenReturn(2L);
        when(jobDTO.getJobStatus()).thenReturn(JobStatus.CLOSED);
        Job job = mock(Job.class);
        when(job.getJobStatus()).thenReturn(JobStatus.DRAFT);
        when(jobRepository.findById(2L)).thenReturn(Optional.of(job));
        when(jobDTO.toEntity()).thenReturn(job);
        when(jobRepository.save(job)).thenReturn(job);
        JobDTO savedDTO = mock(JobDTO.class);
        when(job.toDTO()).thenReturn(savedDTO);

        JobDTO result = jobService.postJob(jobDTO);
        assertEquals(savedDTO, result);
        verify(jobRepository, times(1)).findById(2L);
        verify(jobRepository, times(1)).save(job);
    }

    @Test
    void testGetAllJobs() {
        Job job1 = mock(Job.class);
        Job job2 = mock(Job.class);
        JobDTO dto1 = mock(JobDTO.class);
        JobDTO dto2 = mock(JobDTO.class);

        when(job1.toDTO()).thenReturn(dto1);
        when(job2.toDTO()).thenReturn(dto2);

        List<Job> jobs = List.of(job1, job2);
        when(jobRepository.findAll()).thenReturn(jobs);

        List<JobDTO> result = jobService.getAllJobs();
        assertEquals(2, result.size());
        assertTrue(result.contains(dto1));
        assertTrue(result.contains(dto2));
        verify(jobRepository, times(1)).findAll();
    }

    @Test
    void testGetJobSuccess() throws JobZillaException {
        Job job = mock(Job.class);
        JobDTO dto = mock(JobDTO.class);
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        when(job.toDTO()).thenReturn(dto);

        JobDTO result = jobService.getJob(1L);
        assertEquals(dto, result);
        verify(jobRepository, times(1)).findById(1L);
    }

    @Test
    void testGetJobNotFound() {
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(JobZillaException.class, () -> jobService.getJob(1L));
        verify(jobRepository, times(1)).findById(1L);
    }

    @Test
    void testApplyJobSuccess() throws JobZillaException {
        Job job = mock(Job.class);
        List<Applicant> applicants = new ArrayList<>();
        when(job.getApplicants()).thenReturn(applicants);
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        ApplicantDTO applicantDTO = mock(ApplicantDTO.class);
        when(applicantDTO.getApplicantId()).thenReturn(10L);
        when(applicantDTO.toEntity()).thenReturn(mock(Applicant.class));

        jobService.applyJob(1L, applicantDTO);
        verify(jobRepository, times(1)).save(job);
    }

    @Test
    void testApplyJobAlreadyApplied() {
        Job job = mock(Job.class);
        Applicant applicant = mock(Applicant.class);
        when(applicant.getApplicantId()).thenReturn(10L);
        List<Applicant> applicants = new ArrayList<>();
        applicants.add(applicant);
        when(job.getApplicants()).thenReturn(applicants);
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        ApplicantDTO applicantDTO = mock(ApplicantDTO.class);
        when(applicantDTO.getApplicantId()).thenReturn(10L);

        assertThrows(JobZillaException.class, () -> jobService.applyJob(1L, applicantDTO));
    }

    @Test
    void testApplyJobNotFound() {
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());
        ApplicantDTO applicantDTO = mock(ApplicantDTO.class);
        assertThrows(JobZillaException.class, () -> jobService.applyJob(1L, applicantDTO));
    }

    @Test
    void testGetJobsPostedBy() {
        Job job1 = mock(Job.class);
        Job job2 = mock(Job.class);
        JobDTO dto1 = mock(JobDTO.class);
        JobDTO dto2 = mock(JobDTO.class);

        when(job1.toDTO()).thenReturn(dto1);
        when(job2.toDTO()).thenReturn(dto2);

        List<Job> jobs = List.of(job1, job2);
        when(jobRepository.findByPostedBy(5L)).thenReturn(jobs);

        List<JobDTO> result = jobService.getJobsPostedBy(5L);
        assertEquals(2, result.size());
        assertTrue(result.contains(dto1));
        assertTrue(result.contains(dto2));
        verify(jobRepository, times(1)).findByPostedBy(5L);
    }

    @Test
    void testChangeAppStatusSuccess() throws JobZillaException {
        Job job = mock(Job.class);
        Applicant applicant = mock(Applicant.class);
        when(applicant.getApplicantId()).thenReturn(10L);
        List<Applicant> applicants = new ArrayList<>();
        applicants.add(applicant);
        when(job.getApplicants()).thenReturn(applicants);
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        Application application = mock(Application.class);
        when(application.getId()).thenReturn(1L);
        when(application.getApplicantId()).thenReturn(10L);
        when(application.getApplicationStatus()).thenReturn(ApplicationStatus.INTERVIEWING);
        when(application.getInterviewTime()).thenReturn(LocalDateTime.now());

        jobService.changeAppStatus(application);
        verify(jobRepository, times(1)).save(job);
    }

    @Test
    void testChangeAppStatusJobNotFound() {
        Application application = mock(Application.class);
        when(application.getId()).thenReturn(99L);
        when(jobRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(JobZillaException.class, () -> jobService.changeAppStatus(application));
    }
}