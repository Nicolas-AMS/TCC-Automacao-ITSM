const axios = require('axios');
const prompt = require('../../ia/prompt');

// Responsavel por toda a comunicacao com a API de IA externa
module.exports = {
  async conversar({ titulo, descricao, historico }) {
    // Exemplo de integracao generica - troque pela API de IA que for usar
    // (Anthropic, OpenAI, etc). Aqui fica isolado do resto do sistema.
    if (!process.env.IA_API_KEY) {
      // Modo simulado, util para desenvolver o resto do sistema sem gastar API
      return simularResposta(historico);
    }

    const mensagens = [
      { role: 'system', content: prompt.SYSTEM_PROMPT },
      { role: 'user', content: `Titulo: ${titulo}\nDescricao: ${descricao}` },
      ...historico.map(h => ({
        role: h.autor === 'ia' ? 'assistant' : 'user',
        content: h.texto,
      })),
    ];

    const resposta = await axios.post(
      process.env.IA_API_URL,
      { messages: mensagens },
      { headers: { Authorization: `Bearer ${process.env.IA_API_KEY}` } }
    );

    return interpretarResposta(resposta.data);
  },
};

function simularResposta(historico) {
  const perguntas = [
    'Ha quanto tempo esse problema esta acontecendo?',
    'Isso acontece em algum programa especifico ou no sistema todo?',
    'Voce fez alguma alteracao recente no computador (instalacao, atualizacao)?',
  ];
  const passo = historico.filter(h => h.autor === 'ia').length;

  if (passo < perguntas.length) {
    return { mensagem: perguntas[passo], finalizado: false };
  }

  return {
    mensagem: 'Obrigado! Já tenho informações suficientes para montar o diagnóstico.',
    finalizado: true,
    categoria: 'Software',
    prioridade: 'Media',
  };
}

function interpretarResposta(dataApi) {
  // Adapte de acordo com o formato de resposta da API de IA escolhida
  return {
    mensagem: dataApi.mensagem || dataApi.text || '',
    finalizado: !!dataApi.finalizado,
    categoria: dataApi.categoria,
    prioridade: dataApi.prioridade,
  };
}
