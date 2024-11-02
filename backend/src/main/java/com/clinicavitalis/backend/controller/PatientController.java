package com.clinicavitalis.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinicavitalis.backend.patient.Patient;
import com.clinicavitalis.backend.patient.PatientRepository;
import com.clinicavitalis.backend.patient.PatientRequestDTO;
import com.clinicavitalis.backend.patient.PatientResponseDTO;
import com.clinicavitalis.backend.utils.ValidationUtils;

@RestController
@RequestMapping("/patient")
public class PatientController {
    
    @Autowired
    private PatientRepository repository;

    //@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> savePatient(@RequestBody PatientRequestDTO data){

        Optional<Patient> existingPatient = repository.findByCpf(data.cpf());
        if (existingPatient.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Erro: O CPF já está cadastrado para outro paciente.");
        }

        if (data.name() == null || data.name().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O campo 'Nome' é obrigatório.");
        }

        if (data.birthdate() != null &&  !ValidationUtils.isValidBirthdate(data.birthdate())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: A data de nascimento informada é inválida.");
        }

        if (data.cpf() == null || data.cpf().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O campo 'CPF' é obrigatório.");
        } else if (!ValidationUtils.isValidCPF(data.cpf())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O CPF informado é inválido.");
        }

        if (data.uf() == null || data.uf().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O campo 'UF' é obrigatório.");
        }

        // Salvar paciente
        Patient patientData = new Patient(data);
        repository.save(patientData);

        // Resposta de sucesso
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Paciente cadastrado com sucesso!");
    }

    //@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<PatientResponseDTO> getAll(){

        List<PatientResponseDTO> patientList = repository.findAll().stream().map(PatientResponseDTO::new).toList();
        return patientList;
    }

}
