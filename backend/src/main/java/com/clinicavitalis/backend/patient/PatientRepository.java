package com.clinicavitalis.backend.patient;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    
    Optional<Patient> findByCpf(String cpf);

}
