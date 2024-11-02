package com.clinicavitalis.backend.patient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import com.clinicavitalis.backend.utils.DateUtils;

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

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "height")
    private Double height;

    @Column(name = "uf", nullable = false, length = 2)
    private String uf;

    public Patient(PatientRequestDTO data) {

        this.name = data.name();
        this.cpf = data.cpf().replaceAll("\\D", "");
        
        if (data.birthdate() != null)
            this.birthdate = DateUtils.parseCustomDate(data.birthdate());
        
        if (data.weight() != null)
            this.weight = data.weight();
        
        if (data.height() != null)
            this.height = data.height();
        
        this.uf = data.uf();
    }

}
