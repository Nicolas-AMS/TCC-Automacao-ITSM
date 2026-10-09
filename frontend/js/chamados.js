async function carregarChamados() {
  const tbody = document.querySelector('#tabela-chamados tbody');
  const termoBusca = new URLSearchParams(window.location.search)
    .get('q')
    ?.trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR') || '';
  const termoNormalizado = termoBusca.replace(/[^a-z0-9]/g, '');
  try {
    const resposta = await api.get('/chamados');
    const chamados = termoNormalizado
      ? resposta.filter((chamado) =>
        [chamado.id, chamado.titulo, chamado.status, chamado.prioridade]
          .some((valor) => String(valor ?? '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase('pt-BR')
            .replace(/[^a-z0-9]/g, '')
            .includes(termoNormalizado))
      )
      : resposta;

    if (chamados.length === 0) {
      const linha = document.createElement('tr');
      const celula = document.createElement('td');
      celula.colSpan = 5;
      celula.className = 'ticket-empty';
      celula.textContent = termoNormalizado
        ? `Nenhum chamado encontrado para "${termoBusca}".`
        : 'Você ainda não tem chamados. Abra um novo para começar.';
      linha.appendChild(celula);
      tbody.replaceChildren(linha);
      return;
    }

    const linhas = chamados.map((chamado) => {
      const linha = document.createElement('tr');
      const valores = [
        chamado.id,
        chamado.titulo,
        chamado.status,
        chamado.prioridade,
        new Date(chamado.criado_em).toLocaleDateString('pt-BR'),
      ];

      valores.forEach((valor) => {
        const celula = document.createElement('td');
        celula.textContent = valor ?? '';
        linha.appendChild(celula);
      });

      return linha;
    });
    tbody.replaceChildren(...linhas);
  } catch (err) {
    console.error('Erro ao carregar chamados:', err);
    const linha = document.createElement('tr');
    const celula = document.createElement('td');
    celula.colSpan = 5;
    celula.className = 'ticket-empty';
    celula.textContent = 'Não foi possível carregar os chamados. Tente novamente em instantes.';
    linha.appendChild(celula);
    tbody.replaceChildren(linha);
  }
}
if (exigirLogin()) carregarChamados();
