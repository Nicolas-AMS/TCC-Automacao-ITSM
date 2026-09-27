document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Captura os elementos exatamente pelos IDs do seu HTML
  const nome = document.getElementById('Nome').value; // 'Nome' com N maiúsculo
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const erroEl = document.getElementById('erro-login'); // ID usado no seu HTML para erros
  
  // Limpa mensagens de erro anteriores
  erroEl.textContent = '';

  try {
    // Envia os dados para a rota que criamos no seu backend Express
    await api.post('/auth/register', { nome, email, senha });
    
    // Alerta de sucesso antes de redirecionar
    alert('Cadastro realizado com sucesso!');
    
    // Redireciona o usuário para a página de login
    window.location.href = 'login.html'; 
    
  } catch (err) {
    // Busca a propriedade .mensagem configurada no seu usuarioController
    erroEl.textContent = err.response?.data?.mensagem || err.message || 'Erro ao realizar cadastro.';
  }
});
