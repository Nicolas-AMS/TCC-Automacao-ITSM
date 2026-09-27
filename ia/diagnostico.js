// Organiza e valida a estrutura de saida do diagnostico da IA
function normalizarDiagnostico(bruto) {
  return {
    categoria: bruto.categoria || 'Nao classificado',
    prioridade: bruto.prioridade || 'Media',
    resumo: bruto.resumo || '',
    possiveisCausas: Array.isArray(bruto.possiveisCausas) ? bruto.possiveisCausas : [],
    possiveisSolucoes: Array.isArray(bruto.possiveisSolucoes) ? bruto.possiveisSolucoes : [],
  };
}

module.exports = { normalizarDiagnostico };
