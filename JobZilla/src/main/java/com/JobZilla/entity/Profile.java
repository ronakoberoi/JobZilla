package com.JobZilla.entity;

import java.util.List;

import com.JobZilla.dto.ProfileDTO;
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
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private List<String>skills;
    private List<Experience>experience;
    private List<Certification>certifications;

    public ProfileDTO toDTO(){
        return new ProfileDTO(this.id, this.email, this.jobTitle, this.company, this.location, this.about, this.skills, this.experience, this.certifications);
    }
}