package com.JobZilla.service;

import com.JobZilla.dto.ProfileDTO;
import com.JobZilla.entity.Profile;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.repository.ProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProfileServiceImplTest {

    @Mock
    private ProfileRepository profileRepository;

    @InjectMocks
    private ProfileServiceImpl profileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProfile() throws JobZillaException {
        String email = "test@example.com";
        String name = "Test User";
        Profile profile = new Profile();
        profile.setId(1L);
        profile.setEmail(email);
        profile.setName(name);
        profile.setSkills(new ArrayList<>());
        profile.setExperience(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());

        when(profileRepository.save(any(Profile.class))).thenReturn(profile);

        Long id = profileService.createProfile(email, name);
        assertNotNull(id);
        verify(profileRepository, times(1)).save(any(Profile.class));
    }

    @Test
    void testGetProfileSuccess() throws JobZillaException {
        Profile profile = mock(Profile.class);
        ProfileDTO profileDTO = mock(ProfileDTO.class);

        when(profileRepository.findById(1L)).thenReturn(Optional.of(profile));
        when(profile.toDTO()).thenReturn(profileDTO);

        ProfileDTO result = profileService.getProfile(1L);
        assertEquals(profileDTO, result);
        verify(profileRepository, times(1)).findById(1L);
    }

    @Test
    void testGetProfileNotFound() {
        when(profileRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(JobZillaException.class, () -> profileService.getProfile(1L));
        verify(profileRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateProfileSuccess() throws JobZillaException {
        ProfileDTO profileDTO = mock(ProfileDTO.class);
        Profile profile = mock(Profile.class);

        when(profileDTO.getId()).thenReturn(2L);
        when(profileRepository.findById(2L)).thenReturn(Optional.of(profile));
        when(profileDTO.toEntity()).thenReturn(profile);
        when(profileRepository.save(profile)).thenReturn(profile);

        ProfileDTO result = profileService.updateProfile(profileDTO);
        assertEquals(profileDTO, result);
        verify(profileRepository, times(1)).findById(2L);
        verify(profileRepository, times(1)).save(profile);
    }

    @Test
    void testUpdateProfileNotFound() {
        ProfileDTO profileDTO = mock(ProfileDTO.class);
        when(profileDTO.getId()).thenReturn(99L);
        when(profileRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(JobZillaException.class, () -> profileService.updateProfile(profileDTO));
        verify(profileRepository, times(1)).findById(99L);
        verify(profileRepository, never()).save(any());
    }

    @Test
    void testGetAllProfilesReturnsList() {
        Profile profile1 = mock(Profile.class);
        Profile profile2 = mock(Profile.class);
        ProfileDTO dto1 = mock(ProfileDTO.class);
        ProfileDTO dto2 = mock(ProfileDTO.class);

        when(profile1.toDTO()).thenReturn(dto1);
        when(profile2.toDTO()).thenReturn(dto2);

        List<Profile> profiles = new ArrayList<>();
        profiles.add(profile1);
        profiles.add(profile2);

        when(profileRepository.findAll()).thenReturn(profiles);

        List<ProfileDTO> result = profileService.getAllProfiles();
        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(dto1));
        assertTrue(result.contains(dto2));
        verify(profileRepository, times(1)).findAll();
    }
}