const axios = require('axios');

// Isola toda a integracao com a plataforma ITSM externa
module.exports = {
  async criarTicket({ titulo, resumo, categoria, prioridade }) {
    if (!process.env.ITSM_API_URL) {
      // Sem integracao configurada ainda - apenas simula
      return { id: `SIMULADO-${Date.now()}`, status: 'Aberto' };
    }

    const resposta = await axios.post(
      process.env.ITSM_API_URL,
      { titulo, resumo, categoria, prioridade },
      { headers: { Authorization: `Bearer ${process.env.ITSM_API_TOKEN}` } }
    );

    return resposta.data;
  },
};
