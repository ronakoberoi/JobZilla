package com.JobZilla.entity;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import com.JobZilla.dto.ProfileDTO;
import com.JobZilla.dto.AccountType;
import com.JobZilla.dto.Certification;
import com.JobZilla.dto.Experience;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="profiles")
public class Profile {
    @Id
    private Long id;
    private String name;
    private String email;
    private AccountType accountType;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private byte[] picture;
    private Long totalExp;
    private List<String>skills;
    private List<Experience>experience;
    private List<Certification>certifications;
    private List<Long>savedJobs;
    private List<Map<String,Object>> acceptedJobs = new ArrayList<>();
    private List<Map<String,Object>> rejectedJobs = new ArrayList<>();


    public ProfileDTO toDTO(){
        return new ProfileDTO(this.id,this.name, this.email,this.accountType, this.jobTitle, this.company, this.location, this.about, 
        this.picture!=null?Base64.getEncoder().encodeToString(this.picture):null, this.totalExp,
        this.skills, this.experience, this.certifications, this.savedJobs, this.acceptedJobs, this.rejectedJobs);
    }
}