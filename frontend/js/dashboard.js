async function carregarResumo() {
  try {
    const chamados = await api.get('/chamados');
    const abertos = chamados.filter(c => c.status !== 'Concluido').length;
    const total = chamados.length;

    document.getElementById('resumo').innerHTML = `
      <div class="card"><h3>${total}</h3><p>Chamados totais</p></div>
      <div class="card"><h3>${abertos}</h3><p>Em andamento</p></div>
    `;
  } catch (err) {
    console.error('Erro ao carregar resumo:', err);
  }
}
carregarResumo();
