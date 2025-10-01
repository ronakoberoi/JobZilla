package com.JobZilla.service;

import java.util.List;

import com.JobZilla.dto.NotificationDTO;
import com.JobZilla.entity.Notification;
import com.JobZilla.exception.JobZillaException;

public interface NotificationService {
    public void sendNotification(NotificationDTO notificationDTO) throws JobZillaException;
    public List<Notification> getUnreadNotifications(Long userId);
    public void readNotification(Long id) throws JobZillaException;
}