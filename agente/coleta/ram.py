"""Coleta informacoes de uso de memoria RAM."""
import psutil


def coletar() -> dict:
    memoria = psutil.virtual_memory()
    return {
        "total_gb": round(memoria.total / (1024 ** 3), 2),
        "disponivel_gb": round(memoria.available / (1024 ** 3), 2),
        "uso_percentual": memoria.percent,
    }
