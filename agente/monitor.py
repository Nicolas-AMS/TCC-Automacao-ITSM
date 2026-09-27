"""
Arquivo principal do agente de coleta.
Junta as informacoes de todos os modulos da pasta coleta/ e envia
para o backend Node.js atraves de envio.py
"""
from coleta import cpu, ram, disco, rede, sistema, processos
from envio import enviar_dados


def coletar_tudo():
    return {
        "cpu": cpu.coletar(),
        "ram": ram.coletar(),
        "disco": disco.coletar(),
        "rede": rede.coletar(),
        "sistema": sistema.coletar(),
        "processos": processos.coletar(),
    }


def main():
    print("Coletando dados da maquina...")
    dados = coletar_tudo()
    print("Dados coletados:", dados)

    print("Enviando dados para o backend...")
    resposta = enviar_dados(dados)
    print("Resposta do backend:", resposta)


if __name__ == "__main__":
    main()
