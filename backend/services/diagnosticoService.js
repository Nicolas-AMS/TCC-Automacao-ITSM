const db = require('../database/connection');

// Combina relato do usuario + conversa com IA + dados tecnicos do agente
module.exports = {
  async montarRelatorio({ titulo, descricao, historico, respostaIA }) {
    return {
      titulo,
      resumo: descricao,
      categoria: respostaIA.categoria || 'Nao classificado',
      prioridade: respostaIA.prioridade || 'Media',
      possiveisCausas: respostaIA.possiveisCausas || [],
      possiveisSolucoes: respostaIA.possiveisSolucoes || [],
      historicoConversa: historico,
    };
  },

  async registrarDadosTecnicos(dadosTecnicos) {
    await db.query(
      `INSERT INTO dados_tecnicos (chamado_id, cpu, ram, disco, rede, sistema, processos)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        dadosTecnicos.chamadoId || null,
        JSON.stringify(dadosTecnicos.cpu || {}),
        JSON.stringify(dadosTecnicos.ram || {}),
        JSON.stringify(dadosTecnicos.disco || {}),
        JSON.stringify(dadosTecnicos.rede || {}),
        JSON.stringify(dadosTecnicos.sistema || {}),
        JSON.stringify(dadosTecnicos.processos || {}),
      ]
    );
  },
};
