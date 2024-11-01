package com.clinicavitalis.backend.patient;

public record PatientRequestDTO(
        String name, 
        String cpf, 
        String birthdate,
        Long weight, 
        Long height, 
        String uf
    ) {
    
}
