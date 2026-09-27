"""Coleta informacoes basicas da conexao de rede."""
import socket
import psutil


def coletar() -> dict:
    contadores = psutil.net_io_counters()
    return {
        "hostname": socket.gethostname(),
        "bytes_enviados": contadores.bytes_sent,
        "bytes_recebidos": contadores.bytes_recv,
    }
