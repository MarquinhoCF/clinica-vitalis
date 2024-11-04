package com.clinicavitalis.backend.user;

public record UserRequestDTO(String name, String cpf, String password, String confirmPassword) {
    
}
