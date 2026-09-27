async function carregarChamados() {
  const tbody = document.querySelector('#tabela-chamados tbody');
  try {
    const chamados = await api.get('/chamados');
    tbody.innerHTML = chamados.map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.titulo}</td>
        <td>${c.status}</td>
        <td>${c.prioridade}</td>
        <td>${new Date(c.criado_em).toLocaleDateString('pt-BR')}</td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5">Erro ao carregar chamados: ${err.message}</td></tr>`;
  }
}
carregarChamados();
