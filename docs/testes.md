# Plano de Testes (sugestão)

## Testes manuais
- [ ] Login com credenciais válidas e inválidas
- [ ] Criação de chamado com título e descrição
- [ ] Fluxo completo de diagnóstico com a IA (modo simulado, sem `IA_API_KEY`)
- [ ] Listagem de chamados do usuário
- [ ] Execução do agente Python e envio de dados ao backend
- [ ] Criação de ticket simulado no ITSM (sem `ITSM_API_URL` configurada)

## Testes automatizados (próximo passo)
- Testes unitários dos services (`iaService`, `diagnosticoService`, `itsmService`) com Jest
- Testes unitários dos módulos de coleta em Python com `pytest`
- Testes de integração dos endpoints da API com Supertest
