"""Coleta informacoes do sistema operacional."""
import platform


def coletar() -> dict:
    return {
        "sistema_operacional": platform.system(),
        "versao": platform.version(),
        "nome_maquina": platform.node(),
        "arquitetura": platform.machine(),
    }
