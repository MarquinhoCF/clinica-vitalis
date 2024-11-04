# Clinica Vitalis - Sistema de Cadastro de Pacientes

Este projeto é uma aplicação web para o cadastro de pacientes em uma clínica, incluindo funcionalidades de autenticação e autorização.

## Requisitos

Antes de começar, verifique se você tem as seguintes versões instaladas:

- **Node.js**: 20.11.0
- **Java**: 17 (recomendada versão Zulu)
- **Docker**

## Tecnologias Utilizadas

### Frontend
- **Framework**: React

### Backend
- **Framework**: Spring Boot
- **Bibliotecas**:
  - `spring-boot-starter-data-jpa`
  - `spring-boot-starter-web`
  - `spring-boot-devtools`
  - `mysql-connector-j`
  - `lombok`
  - `spring-boot-starter-test`
  - `json`
  - `spring-security-test`
  - `spring-boot-starter-oauth2-resource-server`
  - `spring-boot-starter-security`

## Instalação

Siga os passos abaixo para instalar e rodar a aplicação.

1. **Gerar Chaves RSA**
   - Acesse o diretório `resources` do backend.
   - Execute os seguintes comandos para gerar a chave privada e a chave pública:
   - Obs: Esses comandos são para o sistema operacional Windows, provavelmente será necessário pesquisar o comando equivalente para outros sistemas operacionais.
     ```bash
     openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
     openssl rsa -in private_key.pem -pubout -out public_key.pem
     ```

2. **Configurar o Banco de Dados**
   - Utilize o Docker no diretório raiz do projeto (onde está o arquivo "docker-compose.yml") para subir um container MySQL:
     ```bash
     docker-compose up -d
     ```

3. **Executar o Backend**
   - Navegue até o diretório `backend` e execute os seguintes comandos:
     ```bash
     mvn install
     mvn spring-boot:run
     ```

4. **Executar o Frontend**
   - Navegue até o diretório `frontend` e execute os seguintes comandos:
     ```bash
     npm install
     npm start
     ```

## Funcionalidades

1. Cadastro de Pacientes com os seguintes campos:
   - Nome (obrigatório)
   - CPF (obrigatório e único)
   - Data de Nascimento
   - Peso (em Kg)
   - Altura (em metros)
   - UF (obrigatório, lista de estados do Brasil)

2. Dados são salvos em um banco de dados MySQL.

3. Frontend utiliza HTML, CSS e JavaScript.

4. APIs criadas com Spring Boot para consumo pelo frontend.

5. CPF é criptografado ao ser armazenado no banco de dados.

6. Mapa interativo utilizando LeafletJS que exibe a quantidade de pacientes cadastrados em cada estado.

7. Implementação de sistema de autenticação e autorização baseado em OAuth2.

8. Documentação disponível para instalação e configuração da aplicação.

## Credenciais do usuário médico hard-coded

- cpf: 155.180.030-64
- password: 123456

## Status das Funcionalidades

- **Funcionalidades concluídas**:
  - 1 - Cadastro de Pacientes
  - 2 - Armazenamento em Banco de Dados
  - 3 - Frontend com React
  - 4 - APIs com Spring Boot
  - 5 - Criptografia do CPF
  - 6 - Mapa com LeafletJS
  - 8 - Documentação de instalação

- **Funcionalidade parcialmente concluída**:
  - 7 - Sistema de Autenticação e Autorização (configuração de CORS não funcionou conforme esperado, pois ao utilizar o Postman para testar a API as rotas pertidas funcionam, mas o servidor React não consegue acessar via axios)

- **Funcionalidades não concluídas**:
  - 9 - Hospedagem da aplicação
  - 10 - Testes automatizados


## Considerações Finais

O Teste prático foi muito desafiador e com certeza me fez aprofundar meus connhecimentos em criação de APIs REST, aprendi bastante sobre Spring Security e geração de tokens com JWT.
