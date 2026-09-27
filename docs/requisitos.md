# Requisitos do Sistema

## Requisitos funcionais
- RF01: O usuário deve conseguir se autenticar no sistema.
- RF02: O usuário deve conseguir abrir um novo chamado descrevendo o problema.
- RF03: O sistema deve conduzir uma conversa de diagnóstico assistida por IA.
- RF04: O agente Python deve coletar dados técnicos da máquina do usuário.
- RF05: O sistema deve gerar um relatório de diagnóstico (categoria, prioridade, causas, soluções).
- RF06: O sistema deve integrar com uma plataforma ITSM externa para criação do ticket final.
- RF07: O usuário deve conseguir consultar seus chamados e o status de cada um.

## Requisitos não funcionais
- RNF01: A comunicação entre frontend e backend deve ser via API REST.
- RNF02: As senhas devem ser armazenadas com hash (bcrypt).
- RNF03: A autenticação deve usar JWT.
- RNF04: O sistema deve funcionar em ambiente local para fins de demonstração do TCC.
