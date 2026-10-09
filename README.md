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

- Reduzir informações incompletas nos chamados;
- Automatizar a coleta de informações técnicas;
- Auxiliar no diagnóstico inicial;
- Organizar os dados coletados;
- Gerar informações mais completas para a equipe de suporte;
- Facilitar a análise do chamado;
- Integrar o sistema com uma plataforma ITSM através de API REST.

📂 Estrutura do projeto

```text
TCC-Automacao-ITSM/
│
├── agente/
│   ├── monitor.py
│   ├── envio.py
│   └── coleta/
│       ├── cpu.py
│       ├── disco.py
│       ├── processos.py
│       ├── ram.py
│       ├── rede.py
│       └── sistema.py
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
│   ├── banco-de-dados.md
│   ├── requisitos.md
│   └── testes.md
│
├── frontend/
│   ├── assets/
│   │   └── css/
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
```

🚀 Como executar

### 1. Backend

Instale as dependências:

npm install

Crie o arquivo .env utilizando o .env.example como referência e preencha as informações necessárias.

Configure o banco de dados utilizando:

backend/database/schema.sql
    Implementar autenticação real com hash de senha e JWT;
    Conectar `iaService.js` a uma API de Inteligência Artificial;
    Popular `base_conhecimento.json` com problemas reais de suporte;
    Implementar `itsmService.js` com a API da plataforma ITSM escolhida;
    Realizar testes automatizados;
    Finalizar a documentação do projeto.

Depois execute o servidor:

npm run dev

O servidor será iniciado em:

http://localhost:3000
O comando `npm run dev` já está configurado no projeto.

#### Windows PowerShell

Caso o PowerShell bloqueie a execução de scripts do npm, pode ser necessário utilizar:

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Essa configuração é específica do ambiente Windows e não é necessária em todos os computadores.

### 2. Frontend

O frontend está localizado na pasta:

frontend/

Abra:

frontend/index.html

no navegador ou utilize uma extensão como Live Server no Visual Studio Code.

O frontend utiliza a API do backend em:

http://localhost:3000/api
### 3. Agente Python

Na raiz do repositório, instale as dependências listadas no projeto:

pip install -r agente/requirements.txt

Execute o agente a partir da raiz do repositório:

python agente/monitor.py

O agente é responsável pela coleta de informações técnicas da máquina.

🗄️ Banco de dados

O projeto utiliza MySQL para armazenamento das informações.

O script de criação das tabelas está localizado em:

backend/database/schema.sql

As credenciais de acesso ao banco devem ser configuradas no arquivo .env.

🤖 Inteligência Artificial

A Inteligência Artificial faz parte da proposta de diagnóstico assistido do sistema.

Atualmente, o diagnóstico conversa com o usuário e o agente envia os dados técnicos separadamente ao backend. A combinação desses dados no diagnóstico ainda precisa ser implementada.

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

## 📚 Documentação

A documentação complementar está disponível em `docs/`:

- [arquitetura.md](docs/arquitetura.md): arquitetura do sistema
- [api.md](docs/api.md): endpoints da API
- [banco-de-dados.md](docs/banco-de-dados.md): estrutura do banco de dados
- [requisitos.md](docs/requisitos.md): requisitos do projeto
- [testes.md](docs/testes.md): testes do sistema
🚧 Status do projeto

🟡 Em desenvolvimento

Próximos passos:

- Integrar os dados coletados pelo agente ao diagnóstico e ao chamado correspondente;
- Configurar e validar a integração com uma API de Inteligência Artificial;
- Configurar a plataforma ITSM escolhida e persistir o identificador do ticket externo;
- Ampliar a base de conhecimento com problemas reais de suporte;
- Criar e executar testes automatizados;
- Revisar e finalizar a documentação do projeto.
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
