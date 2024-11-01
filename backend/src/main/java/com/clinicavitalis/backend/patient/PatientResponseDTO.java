package com.clinicavitalis.backend.patient;

import java.time.LocalDate;

public record PatientResponseDTO(Long id, String name, String cpf, LocalDate birthdate, Long weight, Long height, String uf) {
    
    public PatientResponseDTO(Patient patient){
        this(patient.getId(), patient.getName(), patient.getCpf(), patient.getBirthdate(), patient.getWeight(), patient.getHeight(), patient.getUf());
    }

}
