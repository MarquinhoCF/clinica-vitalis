package com.clinicavitalis.backend.patient;

import java.time.LocalDate;

public record PatientRequestDTO(String name, String cpf, LocalDate birthdate, Long weight, Long height, String uf) {
    
}
