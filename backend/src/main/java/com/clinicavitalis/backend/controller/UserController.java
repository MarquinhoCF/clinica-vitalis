package com.clinicavitalis.backend.controller;

import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinicavitalis.backend.role.Role;
import com.clinicavitalis.backend.role.RoleRepository;
import com.clinicavitalis.backend.user.User;
import com.clinicavitalis.backend.user.UserRepository;
import com.clinicavitalis.backend.user.UserRequestDTO;
import com.clinicavitalis.backend.utils.EncryptionUtils;

@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private static final SecretKey secretKey;

    static {
        try {
            secretKey = EncryptionUtils.getSecretKey();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate secret key", e);
        }
    }

    @Autowired
    public UserController(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_DOCTOR')")
    public ResponseEntity<String> newNurseUser(@RequestBody UserRequestDTO data) {
        if (data.cpf() == null || data.cpf().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O campo 'CPF' é obrigatório.");
        }

        String encryptedCpf;
        try {
            encryptedCpf = EncryptionUtils.encrypt(data.cpf().replaceAll("\\D", ""), secretKey);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criptografar o CPF.");
        }

        Optional<Role> nurseRole = roleRepository.findByName(Role.Values.NURSE.name());
        if (!nurseRole.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: A role 'NURSE' não foi encontrada.");
        }

        Optional<User> existingUser = userRepository.findByCpf(data.cpf().replaceAll("\\D", ""));
        if (existingUser.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Erro: O CPF já está cadastrado para outro Enfermeiro.");
        }

        if (data.name() == null || data.name().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O campo 'Nome' é obrigatório.");
        }

        if (data.password() == null || data.password().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O campo 'Senha' é obrigatório.");
        }

        if (data.confirmPassword() == null || data.confirmPassword().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O campo 'Confirmação de Senha' é obrigatório.");
        }

        if (!data.password().equals(data.confirmPassword())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro: As senhas informadas não conferem.");
        }

        User newUser = new User(data, encryptedCpf, nurseRole.get(), passwordEncoder);
        userRepository.save(newUser);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Enfermeiro cadastrado com sucesso!");
    }

}
