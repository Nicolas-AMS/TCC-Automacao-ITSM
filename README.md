# TCC-ITSM — Service Desk com Diagnóstico Assistido por IA

Sistema de abertura de chamados de TI com:
- Frontend em HTML/CSS/JS puro
- Backend em Node.js + Express
- Diagnóstico assistido por Inteligência Artificial
- Agente de coleta de dados técnicos em Python
- Persistência em MySQL
- Integração com plataforma ITSM via API REST

## Fluxo geral

```
Usuário → Frontend → Node.js (Backend)
                         ├── IA (diagnóstico)
                         ├── MySQL (persistência)
                         └── Agente Python (coleta técnica)
                                  ↓
                           Diagnóstico → Relatório → API ITSM → Ticket criado
```

## Como rodar

### 1. Backend (Node.js)
```bash
npm install
cp .env.example .env    # preencha com suas credenciais
# crie o banco a partir de backend/database/schema.sql
npm run dev

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser 

# caso o power shell não funcione
npm install --save-dev nodemon
npx nodemon backend/server.js
# caso o nodemon não funcione
```

O servidor sobe em `http://localhost:3000`.

### 2. Frontend
Abra `frontend/index.html` no navegador (ou sirva a pasta `frontend/`
com uma extensão tipo Live Server). Ele consome a API em
`http://localhost:3000/api`.

### 3. Agente Python (coleta de dados da máquina)
```bash
cd agente
pip install psutil requests
python monitor.py
```

## Estrutura

Veja `docs/arquitetura.md` para o detalhamento de cada pasta e
`docs/api.md` para a lista de endpoints.

## Próximos passos sugeridos
- [ ] Implementar autenticação real (hash de senha + JWT) — já há esqueleto em `authMiddleware.js`
- [ ] Conectar `iaService.js` a uma API de IA real
- [ ] Popular `base_conhecimento.json` com problemas reais de suporte
- [ ] Implementar `itsmService.js` contra a API da plataforma ITSM escolhida
- [ ] Testes (ver `docs/testes.md`)
