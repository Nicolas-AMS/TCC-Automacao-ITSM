# Banco de Dados

```
usuarios
   │
   └── chamados
          ├── conversas_ia
          ├── dados_tecnicos
          ├── diagnosticos
          ├── relatorios
          └── historico_chamado

categorias (tabela auxiliar)
```

Ver o schema completo em `backend/database/schema.sql`.

## Tabelas
- **usuarios** — dados de login.
- **categorias** — categorias de chamado (Hardware, Software, Rede, etc).
- **chamados** — o chamado em si, com status e prioridade.
- **conversas_ia** — histórico de mensagens trocadas com a IA.
- **dados_tecnicos** — dados coletados pelo agente Python (JSON).
- **diagnosticos** — resultado estruturado do diagnóstico da IA.
- **relatorios** — relatório final gerado para o chamado.
- **historico_chamado** — log de mudanças de status.
