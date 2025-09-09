package com.JobZilla.dto;

import com.JobZilla.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private Long id;
	@NotBlank(message="{user.name.absent}")
	private String name;
	@NotBlank(message="{user.email.absent}")
	@Email(message="{user.email.invalid}")
	private String email;
	@NotBlank(message="{user.password.absent}")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#._!%*?&])[A-Za-z\\d@#._$!%*?&]{8,}$", message = "Password must be at least contains 8 characters and must contain special character and digit.")
	private String password;
	private AccountType accountType;
	
	public User toEntity() {
		return new User(this.id, this.name, this.email, this.password, this.accountType);
	}
}
