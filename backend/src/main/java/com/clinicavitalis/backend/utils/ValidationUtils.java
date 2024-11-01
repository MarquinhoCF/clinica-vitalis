package com.clinicavitalis.backend.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class ValidationUtils {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static boolean isValidCPF(String cpf) {
        cpf = cpf.replaceAll("\\D", "");

        if (cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        // Calcular os dígitos verificadores
        int[] digits = new int[11];
        for (int i = 0; i < 11; i++) {
            digits[i] = Character.getNumericValue(cpf.charAt(i));
        }

        int firstVerifier = calculateVerifierDigit(digits, 9);
        int secondVerifier = calculateVerifierDigit(digits, 10);

        // Verificar se os dígitos verificadores calculados são iguais aos informados
        return firstVerifier == digits[9] && secondVerifier == digits[10];
    }

    private static int calculateVerifierDigit(int[] digits, int length) {
        int sum = 0;
        for (int i = 0; i < length; i++) {
            sum += digits[i] * (length + 1 - i);
        }
        int remainder = (sum * 10) % 11;
        return remainder == 10 ? 0 : remainder;
    }

    public static boolean isValidBirthdate(String birthdateString) {
        if (birthdateString == null || birthdateString.isEmpty()) {
            return false;
        }
        
        try {
            LocalDate birthdate = LocalDate.parse(birthdateString, DATE_FORMAT);
            
            System.out.println(birthdate);

            return isValidBirthdate(birthdate);
        } catch (DateTimeParseException e) {
            return false;
        }
    }
    
    public static boolean isValidBirthdate(LocalDate birthdate) {
        System.out.println(birthdate);
        System.out.println(LocalDate.now());
        System.out.println(birthdate.isBefore(LocalDate.now()));
        return birthdate.isBefore(LocalDate.now());
    }

    public static LocalDate convertStringToLocalDate(String birthdateString) {
        try {
            return LocalDate.parse(birthdateString, DATE_FORMAT);
        } catch (DateTimeParseException e) {
            return null;
        }
    }

}
