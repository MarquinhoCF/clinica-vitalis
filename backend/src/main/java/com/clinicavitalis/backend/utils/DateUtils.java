package com.clinicavitalis.backend.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.springframework.stereotype.Component;

@Component
public class DateUtils {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static LocalDate convertStringToLocalDate(String birthdateString) {
        try {
            return LocalDate.parse(birthdateString, DATE_FORMAT);
        } catch (DateTimeParseException e) {
            return null;
        }
    }

}
