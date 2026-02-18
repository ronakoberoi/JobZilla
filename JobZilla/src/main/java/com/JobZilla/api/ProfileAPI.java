package com.JobZilla.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JobZilla.dto.ProfileDTO;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.service.ProfileService;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/profiles")
public class ProfileAPI {
    @Autowired
    private ProfileService profileService;
    
    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDTO>getProfile(@PathVariable Long id) throws JobZillaException{
        return new ResponseEntity<>(profileService.getProfile(id),HttpStatus.OK);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<ProfileDTO>>getAllProfiles() throws JobZillaException{
        return new ResponseEntity<>(profileService.getAllProfiles(),HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<ProfileDTO>updateProfile(@RequestBody ProfileDTO profileDTO) throws JobZillaException{
        return new ResponseEntity<>(profileService.updateProfile(profileDTO),HttpStatus.OK);
    }
    @PostMapping("/accept/{userId}")
    public ProfileDTO accept(@PathVariable Long userId,@RequestBody Map<String,Object> job){
    return profileService.acceptJob(userId, job);
    }
    @PostMapping("/reject/{userId}")
    public ProfileDTO reject(@PathVariable Long userId,@RequestBody Map<String,Object> job){
    return profileService.rejectJob(userId, job);
    }
}