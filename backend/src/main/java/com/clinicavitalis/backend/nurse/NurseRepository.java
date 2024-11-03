package com.clinicavitalis.backend.nurse;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NurseRepository extends JpaRepository<Nurse, Long> {
    
}
