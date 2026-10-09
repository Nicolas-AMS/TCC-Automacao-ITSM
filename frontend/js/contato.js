const formContato = document.getElementById('form-contato');
const statusContato = document.getElementById('status-contato');
const botaoEnviar = document.getElementById('btn-enviar-contato');

formContato.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusContato.textContent = '';
  statusContato.removeAttribute('data-type');
  botaoEnviar.disabled = true;

  const dadosContato = Object.fromEntries(new FormData(formContato).entries());

  try {
    await api.post('/contatos', dadosContato);
    formContato.reset();
    statusContato.dataset.type = 'success';
    statusContato.textContent = 'Mensagem registrada. Obrigado por entrar em contato com nossa equipe.';
  } catch (err) {
    statusContato.dataset.type = 'error';
    statusContato.textContent = err.message || 'Não foi possível registrar sua mensagem. Tente novamente.';
  } finally {
    botaoEnviar.disabled = false;
  }
});
