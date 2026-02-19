package com.JobZilla.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobZilla.dto.AccountType;
import com.JobZilla.dto.ProfileDTO;
import com.JobZilla.entity.Profile;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.repository.ProfileRepository;
import com.JobZilla.utility.Utilities;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Long createProfile(String email, String name, AccountType accountType) throws JobZillaException {
        Profile profile = new Profile();
        profile.setId(Utilities.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setName(name);
        profile.setAccountType(accountType);
        profile.setSkills(new ArrayList<>());
        profile.setExperience(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobZillaException {
        return profileRepository.findById(id).orElseThrow(() -> new JobZillaException("PROFILE_NOT_FOUND")).toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobZillaException {
        profileRepository.findById(profileDTO.getId()).orElseThrow(() -> new JobZillaException("PROFILE_NOT_FOUND"));
        profileRepository.save(profileDTO.toEntity());
        return profileDTO;
    }

    @Override
    public List<ProfileDTO> getAllProfiles() {
        return profileRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public ProfileDTO acceptJob(Long userId, Map<String,Object> job){
        Profile profile = profileRepository.findById(userId).orElseThrow();
        profile.getAcceptedJobs().add(job);
        profileRepository.save(profile);
        return profile.toDTO();
    }
    @Override
    public ProfileDTO rejectJob(Long userId, Map<String,Object> job){
        Profile profile = profileRepository.findById(userId).orElseThrow();
        profile.getRejectedJobs().add(job);
        profileRepository.save(profile);
        return profile.toDTO();
    }
}