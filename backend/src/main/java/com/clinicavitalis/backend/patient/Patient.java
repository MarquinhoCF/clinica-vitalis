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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "cpf", nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(name = "birthdate", nullable = false)
    private LocalDate birthdate;

    @Column(name = "weight", precision = 5, scale = 2)
    private Long weight;

    @Column(name = "height", precision = 3, scale = 2)
    private Long height;

    @Column(name = "uf", nullable = false, length = 2)
    private String uf;

    public Patient(PatientRequestDTO data) {
        this.name = data.name();
        this.cpf = data.cpf();
        this.birthdate = data.birthdate();
        this.weight = data.weight();
        this.height = data.height();
        this.uf = data.uf();
    }
}
