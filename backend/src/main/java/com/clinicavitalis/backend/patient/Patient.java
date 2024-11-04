package com.clinicavitalis.backend.patient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.clinicavitalis.backend.utils.DateUtils;
import com.clinicavitalis.backend.utils.StateUtils;

@Table(name = "tb_patient")
@Entity(name = "Patient")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "height")
    private Double height;

    @Column(name = "uf", nullable = false, length = 2)
    private String uf;

    private static final String API_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    public Patient(PatientRequestDTO data, String encryptedCpf) {

        this.name = data.name();
        this.cpf = encryptedCpf;
        
        if (data.birthdate() != null)
            this.birthdate = DateUtils.parseCustomDate(data.birthdate());
        
        if (data.weight() != null)
            this.weight = data.weight();
        
        if (data.height() != null)
            this.height = data.height();
        
        this.uf = data.uf();
    }

    public static void initStateCounts(Map<String, Integer> stateCounts) {
        try {
            // Fazer a requisição à API
            URL url = new URL(API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String inputLine;

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONArray estados = new JSONArray(response.toString());

            // Inicializa contagem como 0 para cada estado
            for (int i = 0; i < estados.length(); i++) {
                JSONObject estado = estados.getJSONObject(i);
                String sigla = estado.getString("sigla");
                String nomeEstado = StateUtils.getStateNameBySigla(sigla);
                if (nomeEstado != null) {
                    stateCounts.put(nomeEstado, 0);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
