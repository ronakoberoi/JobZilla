package com.JobZilla;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JobZillaApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobZillaApplication.class, args);
	}

}