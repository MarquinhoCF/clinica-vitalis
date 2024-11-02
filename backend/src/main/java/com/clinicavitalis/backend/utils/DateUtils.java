package com.clinicavitalis.backend.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.springframework.stereotype.Component;

@Component
public class DateUtils {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter ISO_DATE_FORMAT = DateTimeFormatter.ISO_DATE_TIME;

    public static LocalDate parseISODate(String birthdateString) {
        try {
            LocalDateTime dateTime = LocalDateTime.parse(birthdateString, ISO_DATE_FORMAT);
            System.out.println("Data ISO 8601: " + dateTime.toLocalDate());
            return dateTime.toLocalDate();
        } catch (DateTimeParseException e) {
            System.out.println("Erro ao analisar data ISO 8601: " + e);
            return null;
        }
    }

    public static LocalDate parseCustomDate(String birthdateString) {
        try {
            LocalDate birthdate = LocalDate.parse(birthdateString, DATE_FORMAT);
            System.out.println("Data formatada: " + birthdate);
            return birthdate;
        } catch (DateTimeParseException e) {
            System.out.println("Erro ao analisar data com formato personalizado: " + e);
            return null;
        }
    }

}
