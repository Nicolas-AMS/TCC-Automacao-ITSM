"""Coleta informacoes de uso do armazenamento."""
import psutil


def coletar() -> dict:
    uso = psutil.disk_usage("/")
    return {
        "total_gb": round(uso.total / (1024 ** 3), 2),
        "livre_gb": round(uso.free / (1024 ** 3), 2),
        "uso_percentual": uso.percent,
    }
