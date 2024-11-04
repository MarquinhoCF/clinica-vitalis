package com.clinicavitalis.backend.config;

import org.springframework.boot.CommandLineRunner;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.clinicavitalis.backend.role.Role;
import com.clinicavitalis.backend.role.RoleRepository;
import com.clinicavitalis.backend.user.User;
import com.clinicavitalis.backend.user.UserRepository;

import jakarta.transaction.Transactional;

@Configuration
public class DoctorUserConfig implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public DoctorUserConfig(RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        
        Optional<Role> roleDoctor = roleRepository.findByName(Role.Values.DOCTOR.name());
        if (!roleDoctor.isPresent()) {
            throw new RuntimeException("Role DOCTOR not found");
        }

        Optional<User> user = userRepository.findByCpf("15518003064");
        if (user.isPresent()) {
            System.out.println("Doctor user already exists");
        } else {
            User newUser = new User();
            newUser.setName("Doctor");
            newUser.setCpf("15518003064"); // CPF gerado aleatoriamente
            newUser.setPassword(passwordEncoder.encode("123456"));
            newUser.setRoles(Set.of(roleDoctor.get()));
            userRepository.save(newUser);
            System.out.println("Doctor user created");
        }
    }
    
}
