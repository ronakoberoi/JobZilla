package com.JobZilla.service;

import com.JobZilla.dto.NotificationDTO;
import com.JobZilla.dto.NotificationStatus;
import com.JobZilla.entity.Notification;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.repository.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NotificationServiceImplTest {

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSendNotification() throws JobZillaException {
        NotificationDTO notificationDTO = mock(NotificationDTO.class);
        Notification notification = mock(Notification.class);

        when(notificationDTO.toEntity()).thenReturn(notification);
        when(notificationRepository.save(notification)).thenReturn(notification);

        notificationService.sendNotification(notificationDTO);
        verify(notificationDTO, times(1)).setId(anyLong());
        verify(notificationDTO, times(1)).setStatus(NotificationStatus.UNREAD);
        verify(notificationDTO, times(1)).setTimestamp(any(LocalDateTime.class));
        verify(notificationRepository, times(1)).save(notification);
    }

    @Test
    void testGetUnreadNotifications() {
        Notification notification1 = mock(Notification.class);
        Notification notification2 = mock(Notification.class);
        List<Notification> notifications = List.of(notification1, notification2);

        when(notificationRepository.findByUserIdAndStatus(1L, NotificationStatus.UNREAD)).thenReturn(notifications);

        List<Notification> result = notificationService.getUnreadNotifications(1L);
        assertEquals(2, result.size());
        assertTrue(result.contains(notification1));
        assertTrue(result.contains(notification2));
        verify(notificationRepository, times(1)).findByUserIdAndStatus(1L, NotificationStatus.UNREAD);
    }

    @Test
    void testReadNotificationSuccess() throws JobZillaException {
        Notification notification = mock(Notification.class);
        when(notificationRepository.findById(1L)).thenReturn(Optional.of(notification));
        when(notificationRepository.save(notification)).thenReturn(notification);

        notificationService.readNotification(1L);
        verify(notification, times(1)).setStatus(NotificationStatus.READ);
        verify(notificationRepository, times(1)).save(notification);
    }

    @Test
    void testReadNotificationNotFound() {
        when(notificationRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(JobZillaException.class, () -> notificationService.readNotification(99L));
        verify(notificationRepository, times(1)).findById(99L);
    }
}