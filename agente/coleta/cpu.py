"""Coleta informacoes de uso do processador."""
import psutil


def coletar() -> dict:
    return {
        "uso_percentual": psutil.cpu_percent(interval=1),
        "nucleos_fisicos": psutil.cpu_count(logical=False),
        "nucleos_logicos": psutil.cpu_count(logical=True),
        "frequencia_mhz": getattr(psutil.cpu_freq(), "current", None),
    }
