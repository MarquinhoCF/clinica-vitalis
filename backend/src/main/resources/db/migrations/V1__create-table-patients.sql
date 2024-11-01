CREATE TABLE patient (
    id SERIAL PRIMARY KEY,           -- Identificador único para cada paciente
    name VARCHAR(100) NOT NULL,      -- Nome do paciente
    cpf CHAR(11) UNIQUE NOT NULL,    -- CPF (11 dígitos), deve ser único
    birthdate DATE NOT NULL,         -- Data de nascimento
    weight DECIMAL(5,2),             -- Peso em Kg
    heiht DECIMAL(3,2),              -- Altura em metros
    uf CHAR(2) NOT NULL              -- UF (Unidade Federativa) com 2 caracteres, deve ser obrigatório
);