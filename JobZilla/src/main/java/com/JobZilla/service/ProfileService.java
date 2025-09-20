package com.JobZilla.service;

import com.JobZilla.dto.ProfileDTO;
import com.JobZilla.exception.JobZillaException;

public interface ProfileService {
    public Long createProfile(String email) throws JobZillaException;

    public ProfileDTO getProfile(Long id) throws JobZillaException;

    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobZillaException;
}