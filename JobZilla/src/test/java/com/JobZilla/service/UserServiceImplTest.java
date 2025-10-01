package com.JobZilla.service;

import com.JobZilla.dto.LoginDTO;
import com.JobZilla.dto.NotificationDTO;
import com.JobZilla.dto.ResponseDTO;
import com.JobZilla.dto.UserDTO;
import com.JobZilla.entity.OTP;
import com.JobZilla.entity.User;
import com.JobZilla.exception.JobZillaException;
import com.JobZilla.repository.OTPRepository;
import com.JobZilla.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private OTPRepository otpRepository;

    @Mock
    private ProfileService profileService;

    @Mock
    private NotificationService notificationService;

    @Mock
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser_UserAlreadyExists() {
        UserDTO userDTO = mock(UserDTO.class);
        when(userDTO.getEmail()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(new User()));
        assertThrows(JobZillaException.class, () -> userService.registerUser(userDTO));
    }

    @Test
    void testRegisterUser_Success() throws JobZillaException {
        UserDTO userDTO = mock(UserDTO.class);
        when(userDTO.getEmail()).thenReturn("new@example.com");
        when(userDTO.getName()).thenReturn("New User");
        when(userDTO.getPassword()).thenReturn("password");
        when(userRepository.findByEmail("new@example.com")).thenReturn(Optional.empty());
        when(profileService.createProfile(anyString(), anyString())).thenReturn(1L);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        User user = mock(User.class);
        when(userDTO.toEntity()).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        UserDTO savedDTO = mock(UserDTO.class);
        when(user.toDTO()).thenReturn(savedDTO);

        UserDTO result = userService.registerUser(userDTO);
        assertEquals(savedDTO, result);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testLoginUser_UserNotFound() {
        LoginDTO loginDTO = mock(LoginDTO.class);
        when(loginDTO.getEmail()).thenReturn("notfound@example.com");
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());
        assertThrows(JobZillaException.class, () -> userService.loginUser(loginDTO));
    }

    @Test
    void testLoginUser_InvalidPassword() {
        LoginDTO loginDTO = mock(LoginDTO.class);
        when(loginDTO.getEmail()).thenReturn("user@example.com");
        when(loginDTO.getPassword()).thenReturn("wrongpass");
        User user = mock(User.class);
        when(user.getPassword()).thenReturn("encodedPassword");
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongpass", "encodedPassword")).thenReturn(false);
        assertThrows(JobZillaException.class, () -> userService.loginUser(loginDTO));
    }

    @Test
    void testLoginUser_Success() throws JobZillaException {
        LoginDTO loginDTO = mock(LoginDTO.class);
        when(loginDTO.getEmail()).thenReturn("user@example.com");
        when(loginDTO.getPassword()).thenReturn("password");
        User user = mock(User.class);
        when(user.getPassword()).thenReturn("encodedPassword");
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);
        UserDTO userDTO = mock(UserDTO.class);
        when(user.toDTO()).thenReturn(userDTO);

        UserDTO result = userService.loginUser(loginDTO);
        assertEquals(userDTO, result);
    }

    @Test
    void testVerifyOtp_OtpNotFound() {
        when(otpRepository.findById("user@example.com")).thenReturn(Optional.empty());
        assertThrows(JobZillaException.class, () -> userService.verifyOtp("user@example.com", "123456"));
    }

    @Test
    void testVerifyOtp_OtpIncorrect() {
        OTP otpEntity = mock(OTP.class);
        when(otpEntity.getOtpCode()).thenReturn("654321");
        when(otpRepository.findById("user@example.com")).thenReturn(Optional.of(otpEntity));
        assertThrows(JobZillaException.class, () -> userService.verifyOtp("user@example.com", "123456"));
    }

    @Test
    void testVerifyOtp_Success() throws JobZillaException {
        OTP otpEntity = mock(OTP.class);
        when(otpEntity.getOtpCode()).thenReturn("123456");
        when(otpRepository.findById("user@example.com")).thenReturn(Optional.of(otpEntity));
        assertTrue(userService.verifyOtp("user@example.com", "123456"));
    }

    @Test
    void testChangePassword_UserNotFound() {
        LoginDTO loginDTO = mock(LoginDTO.class);
        when(loginDTO.getEmail()).thenReturn("notfound@example.com");
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());
        assertThrows(JobZillaException.class, () -> userService.changePassword(loginDTO));
    }

    @Test
    void testChangePassword_Success() throws JobZillaException {
        LoginDTO loginDTO = mock(LoginDTO.class);
        when(loginDTO.getEmail()).thenReturn("user@example.com");
        when(loginDTO.getPassword()).thenReturn("newpass");
        User user = mock(User.class);
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newpass")).thenReturn("encodedNewPass");
        NotificationDTO noti = mock(NotificationDTO.class);

        ResponseDTO response = userService.changePassword(loginDTO);
        assertEquals("Password Changed Successfully..", response.getMessage());
        verify(userRepository, times(1)).save(user);
        verify(notificationService, times(1)).sendNotification(any(NotificationDTO.class));
    }

    @Test
    void testRemoveExpiredOTPs() {
        List<OTP> expiredOTPs = List.of(mock(OTP.class), mock(OTP.class));
        when(otpRepository.findByCreationTimeBefore(any(LocalDateTime.class))).thenReturn(expiredOTPs);
        userService.removeExpiredOTPs();
        verify(otpRepository, times(1)).deleteAll(expiredOTPs);
    }
}