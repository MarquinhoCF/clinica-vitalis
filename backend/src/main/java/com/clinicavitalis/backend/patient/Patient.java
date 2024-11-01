package com.clinicavitalis.backend.patient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Table(name = "patient")
@Entity(name = "Patient")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Patient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String cpf;
    private LocalDate birthdate;
    private Long weight;
    private Long height;
    private String uf;

    public Patient(PatientRequestDTO data){
        this.name = data.name();
        this.cpf = data.cpf();
        this.birthdate = data.birthdate();
        this.weight = data.weight();
        this.height = data.height();
        this.uf = data.uf();
    }
    
}
