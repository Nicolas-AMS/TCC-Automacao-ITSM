-- Banco de dados do sistema ITSM
CREATE DATABASE IF NOT EXISTS tcc_itsm CHARACTER SET utf8mb4;
USE tcc_itsm;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE chamados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  resumo TEXT,
  categoria VARCHAR(100),
  prioridade ENUM('Baixa', 'Media', 'Alta', 'Critica') DEFAULT 'Media',
  status ENUM('Aberto', 'Em andamento', 'Concluido') DEFAULT 'Aberto',
  ticket_externo_id VARCHAR(100),
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE conversas_ia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id INT NOT NULL,
  autor ENUM('usuario', 'ia') NOT NULL,
  mensagem TEXT NOT NULL,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chamado_id) REFERENCES chamados(id)
);

CREATE TABLE dados_tecnicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id INT,
  cpu JSON,
  ram JSON,
  disco JSON,
  rede JSON,
  sistema JSON,
  processos JSON,
  coletado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chamado_id) REFERENCES chamados(id)
);

CREATE TABLE diagnosticos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id INT NOT NULL,
  categoria VARCHAR(100),
  prioridade VARCHAR(50),
  possiveis_causas JSON,
  possiveis_solucoes JSON,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chamado_id) REFERENCES chamados(id)
);

CREATE TABLE relatorios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id INT NOT NULL,
  conteudo TEXT,
  gerado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chamado_id) REFERENCES chamados(id)
);

CREATE TABLE historico_chamado (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id INT NOT NULL,
  status_anterior VARCHAR(50),
  status_novo VARCHAR(50),
  alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chamado_id) REFERENCES chamados(id)
);
