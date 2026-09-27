"""
Responsavel por enviar os dados coletados para a API do backend Node.js
"""
import requests

BACKEND_URL = "http://localhost:3000/api/agente/dados"


def enviar_dados(dados: dict, chamado_id: int | None = None) -> dict:
    payload = {**dados, "chamadoId": chamado_id}
    try:
        resposta = requests.post(BACKEND_URL, json=payload, timeout=10)
        resposta.raise_for_status()
        return resposta.json()
    except requests.RequestException as erro:
        return {"erro": str(erro)}
