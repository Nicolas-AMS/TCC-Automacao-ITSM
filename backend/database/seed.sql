USE tcc_itsm;

INSERT INTO categorias (nome) VALUES
  ('Hardware'), ('Software'), ('Rede'), ('Acesso/Conta'), ('Outros');

-- Senha de exemplo: "123456" (ja em hash bcrypt fake para teste local)
INSERT INTO usuarios (nome, email, senha_hash) VALUES
  ('Usuario Teste', 'teste@exemplo.com', '$2a$10$exemploDeHashSubstituirDepois');
