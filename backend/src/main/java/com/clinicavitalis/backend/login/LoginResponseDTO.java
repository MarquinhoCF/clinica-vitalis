package com.clinicavitalis.backend.login;

public record LoginResponseDTO(String username, String message, String accessToken, Long expiresIn) {
    
}
