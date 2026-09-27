const chatEl = document.getElementById('chat-ia');
const relato = JSON.parse(sessionStorage.getItem('relatoInicial') || '{}');
const historico = [];

function adicionarMensagem(autor, texto) {
  const p = document.createElement('p');
  p.className = autor === 'ia' ? 'ia' : 'usuario';
  p.textContent = texto;
  chatEl.appendChild(p);
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function iniciarDiagnostico() {
  adicionarMensagem('usuario', relato.descricao);
  const resposta = await api.post('/diagnostico', {
    titulo: relato.titulo,
    descricao: relato.descricao,
    historico,
  });
  historico.push({ autor: 'ia', texto: resposta.mensagem });
  adicionarMensagem('ia', resposta.mensagem);

  if (resposta.finalizado) {
    localStorage.setItem('ultimoDiagnostico', JSON.stringify(resposta.diagnostico));
    window.location.href = 'resultado.html';
  }
}

document.getElementById('form-diagnostico').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('resposta');
  const texto = input.value;
  adicionarMensagem('usuario', texto);
  historico.push({ autor: 'usuario', texto });
  input.value = '';

  const resposta = await api.post('/diagnostico', {
    titulo: relato.titulo,
    descricao: relato.descricao,
    historico,
  });
  historico.push({ autor: 'ia', texto: resposta.mensagem });
  adicionarMensagem('ia', resposta.mensagem);

  if (resposta.finalizado) {
    localStorage.setItem('ultimoDiagnostico', JSON.stringify(resposta.diagnostico));
    window.location.href = 'resultado.html';
  }
});

iniciarDiagnostico();
