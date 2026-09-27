# Arquitetura do Sistema

```
Usuário → Frontend (HTML/CSS/JS) → Backend (Node.js/Express)
                                        ├── IA (diagnóstico)
                                        ├── MySQL (persistência)
                                        └── Agente Python (coleta técnica)
                                                 ↓
                                    Diagnóstico → Relatório → API ITSM → Ticket criado
```

## Camadas do backend
- **routes/** — define os endpoints da API.
- **controllers/** — recebem a requisição, validam e delegam para os services.
- **services/** — contêm a lógica de negócio (IA, diagnóstico, integração ITSM).
- **middleware/** — autenticação (JWT) e tratamento de erros.
- **database/** — conexão MySQL e scripts SQL (schema e seed).

## Módulo de IA (`ia/`)
Fica separado do backend para isolar prompts, regras e base de conhecimento
da lógica de comunicação HTTP. `backend/services/iaService.js` é quem
efetivamente chama a API de IA usando o que está definido aqui.

## Agente Python (`agente/`)
Roda na máquina do usuário, coleta CPU, RAM, disco, rede, dados do sistema
e processos, e envia para o backend via `envio.py`.
