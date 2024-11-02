-- Altera o tipo do campo cpf de CHAR(11) para TEXT
ALTER TABLE patient
ALTER COLUMN cpf TYPE TEXT;

CREATE UNIQUE INDEX idx_unique_cpf ON patient(cpf);