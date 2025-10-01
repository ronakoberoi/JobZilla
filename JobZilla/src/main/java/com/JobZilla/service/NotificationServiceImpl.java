package com.JobZilla.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobZilla.dto.NotificationDTO;
import com.JobZilla.dto.NotificationStatus;
import com.JobZilla.entity.Notification;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.repository.NotificationRepository;
import com.JobZilla.utility.Utilities;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws JobZillaException {
        notificationDTO.setId(Utilities.getNextSequence("notification"));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimestamp(LocalDateTime.now());
        notificationRepository.save(notificationDTO.toEntity());
    }

    @Override
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotification(Long id) throws JobZillaException {
        Notification noti = notificationRepository.findById(id).orElseThrow(()-> new 
        JobZillaException("No Notification Found"));
        noti.setStatus(NotificationStatus.READ);
        notificationRepository.save(noti);
    }
}