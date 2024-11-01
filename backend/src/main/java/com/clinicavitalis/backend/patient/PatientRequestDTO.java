package com.clinicavitalis.backend.patient;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public record PatientRequestDTO(
        String name, 
        String cpf, 
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
        LocalDate birthdate,
        Long weight, 
        Long height, 
        String uf
    ) {
    
}
