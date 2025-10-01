package com.JobZilla.service;

import java.util.List;

import com.JobZilla.dto.ProfileDTO;
import com.JobZilla.exception.JobZillaException;

public interface ProfileService {
    public Long createProfile(String email) throws JobZillaException;

    public ProfileDTO getProfile(Long id) throws JobZillaException;

    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobZillaException;

    public List<ProfileDTO> getAllProfiles();
}