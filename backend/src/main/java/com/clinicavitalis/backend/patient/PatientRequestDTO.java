package com.clinicavitalis.backend.patient;

public record PatientRequestDTO(
        String name, 
        String cpf, 
        String birthdate,
        Double weight, 
        Double height, 
        String uf
    ) {
    
}
