package com.JobZilla.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.JobZilla.dto.NotificationStatus;
import com.JobZilla.entity.Notification;


public interface NotificationRepository extends MongoRepository<Notification, Long>{
	public List<Notification> findByUserIdAndStatus(Long id, NotificationStatus status);
}