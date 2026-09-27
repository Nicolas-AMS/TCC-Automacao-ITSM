# TCC-ITSM — Service Desk com Diagnóstico Assistido por IA

Sistema de abertura e diagnóstico de chamados de TI desenvolvido como Trabalho de Conclusão de Curso (TCC).

O projeto tem como objetivo auxiliar no processo de abertura de chamados, utilizando Inteligência Artificial e coleta automatizada de informações técnicas para gerar solicitações mais completas e organizadas para a equipe de suporte.

## 🛠️ Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Python
- MySQL
- Inteligência Artificial
- API REST

## 📌 Principais componentes

- **Frontend:** interface web desenvolvida com HTML, CSS e JavaScript puro.
- **Backend:** servidor desenvolvido em Node.js com Express.
- **IA:** responsável pelo diagnóstico assistido e organização das informações.
- **Agente Python:** responsável pela coleta de dados técnicos da máquina.
- **MySQL:** utilizado para persistência dos dados.
- **API REST:** utilizada para comunicação entre os componentes e futura integração com uma plataforma ITSM.

## 🔄 Fluxo geral

Usuário
   ↓
Frontend
   ↓
Node.js + Express
   ├── IA (diagnóstico)
   ├── MySQL (persistência)
   └── Agente Python
          ↓
   Coleta de dados técnicos
          ↓
   Diagnóstico assistido
          ↓
   Relatório técnico
          ↓
   API REST ITSM
          ↓
   Chamado
💡 Problema

Em ambientes de suporte de TI, é comum que usuários abram chamados com informações incompletas ou pouco detalhadas, como:

"Meu computador está travando."

"A internet está lenta."

"Meu computador está muito lento."

Essas informações podem ser insuficientes para que o profissional de suporte identifique rapidamente o problema.

O sistema busca reduzir esse problema coletando automaticamente informações técnicas da máquina e utilizando esses dados como apoio ao diagnóstico.

🎯 Objetivo

O projeto tem como objetivo melhorar o processo de abertura de chamados ITSM através da automação da coleta de informações técnicas e do auxílio da Inteligência Artificial no diagnóstico.

Entre os objetivos estão:

Reduzir informações incompletas nos chamados;
Automatizar a coleta de informações técnicas;
Auxiliar no diagnóstico inicial;
Organizar os dados coletados;
Gerar informações mais completas para a equipe de suporte;
Facilitar a análise do chamado;
Integrar o sistema com uma plataforma ITSM através de API REST.
📂 Estrutura do projeto
TCC-Automacao-ITSM/
│
├── agente/
│   ├── monitor.py
│   ├── coleta_cpu.py
│   ├── coleta_ram.py
│   ├── coleta_disco.py
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── docs/
│   ├── arquitetura.md
│   ├── api.md
│   └── testes.md
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── chamados.html
│   └── chamado.html
│
├── ia/
│   └── ...
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
🚀 Como executar
1. Backend

Instale as dependências:

npm install

Crie o arquivo .env utilizando o .env.example como referência e preencha as informações necessárias.

Configure o banco de dados utilizando:

backend/database/schema.sql

Depois execute o servidor:

npm run dev

O servidor será iniciado em:

http://localhost:3000
Caso o npm run dev não esteja configurado

Instale o Nodemon:

npm install --save-dev nodemon

Depois execute:

npx nodemon backend/server.js
Windows PowerShell

Caso o PowerShell bloqueie a execução de scripts do npm, pode ser necessário utilizar:

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Essa configuração é específica do ambiente Windows e não é necessária em todos os computadores.

🌐 2. Frontend

O frontend está localizado na pasta:

frontend/

Abra:

frontend/index.html

no navegador ou utilize uma extensão como Live Server no Visual Studio Code.

O frontend utiliza a API do backend em:

http://localhost:3000/api
🐍 3. Agente Python

Entre na pasta do agente:

cd agente

Instale as dependências:

pip install psutil requests

Execute o agente:

python monitor.py

O agente é responsável pela coleta de informações técnicas da máquina.

🗄️ Banco de dados

O projeto utiliza MySQL para armazenamento das informações.

O script de criação das tabelas está localizado em:

backend/database/schema.sql

As credenciais de acesso ao banco devem ser configuradas no arquivo .env.

🤖 Inteligência Artificial

A Inteligência Artificial faz parte da proposta de diagnóstico assistido do sistema.

As informações fornecidas pelo usuário podem ser combinadas com os dados técnicos coletados pelo agente Python para auxiliar na elaboração de um diagnóstico mais estruturado.

Exemplo:

Problema informado:
"Meu computador está lento."

+

Informações técnicas:
CPU
RAM
Disco
Sistema operacional
Processos

↓

Diagnóstico assistido por IA

↓

Relatório técnico

↓

Chamado ITSM

A Inteligência Artificial tem função de apoio ao diagnóstico e não substitui a análise do profissional de suporte.

🔌 Integração ITSM

O projeto possui uma estrutura destinada à integração com uma plataforma ITSM através de API REST.

O fluxo planejado é:

Usuário
   ↓
Abertura do chamado
   ↓
Coleta de informações
   ↓
Diagnóstico assistido
   ↓
Relatório técnico
   ↓
API ITSM
   ↓
Chamado

A integração final depende da plataforma ITSM escolhida e dos endpoints disponibilizados por sua API.

📚 Documentação

A documentação complementar do projeto está disponível na pasta:

docs/
Documentos
docs/arquitetura.md — Arquitetura do sistema
docs/api.md — Endpoints da API
docs/testes.md — Testes do sistema
🚧 Status do projeto

🟡 Em desenvolvimento

Próximos passos
 Implementar autenticação real com hash de senha e JWT
 Conectar iaService.js a uma API de Inteligência Artificial
 Popular base_conhecimento.json com problemas reais de suporte
 Implementar itsmService.js com a API da plataforma ITSM escolhida
 Realizar testes automatizados
 Finalizar a documentação do projeto
🔐 Segurança

Informações sensíveis não devem ser enviadas para o GitHub.

Nunca publique:

.env

ou arquivos contendo:

Senhas
Tokens
API Keys
Credenciais do banco de dados
Dados pessoais

Utilize o arquivo:

.env.example

para indicar quais variáveis de ambiente são necessárias sem expor seus valores.

🎓 Contexto acadêmico

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso do curso técnico de Informática para Internet.

O projeto envolve conceitos de:

Desenvolvimento Web;
Node.js;
Banco de Dados;
APIs REST;
Inteligência Artificial;
Automação;
ITSM;
Suporte Técnico;
Coleta de informações de sistemas.
👨‍💻 Autor

Nicolas Thiago Ferreira

Estudante de Informática para Internet.

Interesses:

Desenvolvimento Web • ITSM • Automação • Inteligência Artificial • Tecnologia
