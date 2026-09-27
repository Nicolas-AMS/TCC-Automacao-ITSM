"""Coleta informacoes dos processos em execucao com maior uso de CPU/RAM."""
import psutil


def coletar(limite: int = 10) -> list:
    processos = []
    for proc in psutil.process_iter(["pid", "name", "cpu_percent", "memory_percent"]):
        try:
            processos.append(proc.info)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    processos.sort(key=lambda p: p.get("cpu_percent") or 0, reverse=True)
    return processos[:limite]
