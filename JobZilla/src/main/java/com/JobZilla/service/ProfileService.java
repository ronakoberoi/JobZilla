package com.JobZilla.service;

import java.util.List;
import java.util.Map;

import com.JobZilla.dto.ProfileDTO;
import com.JobZilla.exception.JobZillaException;

public interface ProfileService {
    public Long createProfile(String email, String name) throws JobZillaException;

    public ProfileDTO getProfile(Long id) throws JobZillaException;

    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobZillaException;

    public List<ProfileDTO> getAllProfiles();

    public ProfileDTO acceptJob(Long userId, Map<String,Object> job);
    
    public ProfileDTO rejectJob(Long userId, Map<String,Object> job);

}