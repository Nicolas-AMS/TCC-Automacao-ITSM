# Endpoints da API

## Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/auth/login | Autentica o usuário e retorna um token JWT |
| POST | /api/auth/register | Cadastra um usuário; não exige autenticação |

## Contato
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/contatos | Registra uma mensagem de contato (não exige autenticação) |

## Usuários
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/usuarios | Cria um novo usuário |
| GET | /api/usuarios | Lista usuários (autenticado) |

## Chamados
| Método | Rota | Descrição |
|---|---|---|
| GET | /api/chamados | Lista os chamados do usuário logado (requer token JWT) |
| GET | /api/chamados/:id | Busca um chamado específico (requer token JWT) |
| POST | /api/chamados | Cria um novo chamado (requer token JWT e envia para o ITSM externo) |

## Diagnóstico
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/diagnostico | Envia uma mensagem autenticada e recebe a próxima pergunta ou o diagnóstico final da IA |

## Agente
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/agente/dados | Recebe os dados técnicos coletados pelo agente Python |
