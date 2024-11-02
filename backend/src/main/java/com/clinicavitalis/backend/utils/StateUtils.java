package com.clinicavitalis.backend.utils;

import java.util.HashMap;
import java.util.Map;

public class StateUtils {

    public static String getStateNameBySigla(String sigla) {
        Map<String, String> stateMapping = new HashMap<>();
        stateMapping.put("AC", "ACRE");
        stateMapping.put("AL", "ALAGOAS");
        stateMapping.put("AP", "AMAPÁ");
        stateMapping.put("BA", "BAHIA");
        stateMapping.put("CE", "CEARÁ");
        stateMapping.put("DF", "DISTRITO FEDERAL");
        stateMapping.put("ES", "ESPÍRITO SANTO");
        stateMapping.put("GO", "GOIÁS");
        stateMapping.put("MA", "MARANHÃO");
        stateMapping.put("MG", "MINAS GERAIS");
        stateMapping.put("MS", "MATO GROSSO DO SUL");
        stateMapping.put("MT", "MATO GROSSO");
        stateMapping.put("PA", "PARÁ");
        stateMapping.put("PB", "PARAÍBA");
        stateMapping.put("PE", "PERNAMBUCO");
        stateMapping.put("PI", "PIAUÍ");
        stateMapping.put("PR", "PARANÁ");
        stateMapping.put("RJ", "RIO DE JANEIRO");
        stateMapping.put("RN", "RIO GRANDE DO NORTE");
        stateMapping.put("RO", "RONDÔNIA");
        stateMapping.put("RR", "RORAIMA");
        stateMapping.put("RS", "RIO GRANDE DO SUL");
        stateMapping.put("SC", "SANTA CATARINA");
        stateMapping.put("SE", "SERGIPE");
        stateMapping.put("SP", "SÃO PAULO");
        stateMapping.put("TO", "TOCANTINS");

        return stateMapping.get(sigla);
    }
    
}