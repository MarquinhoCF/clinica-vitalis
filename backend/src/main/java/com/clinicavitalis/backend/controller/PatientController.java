package com.clinicavitalis.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/paciente")
public class PatientController {
    
    @Autowired
    private PatientRepository repository;

    //@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void savePatient(@RequestBody PatientRequestDTO data){
        
        Patient patientData = new Patient(data);
        repository.save(patientData);
    }

    //@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<PatientResponseDTO> getAll(){

        List<PatientResponseDTO> patientList = repository.findAll().stream().map(PatientResponseDTO::new).toList();
        return patientList;
    }

}
