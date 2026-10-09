document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('Nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;
  const erroEl = document.getElementById('erro-login');

  erroEl.textContent = '';

  if (!nome || !email || !senha || !confirmarSenha) {
    erroEl.textContent = 'Preencha todos os campos.';
    return;
  }

  if (senha !== confirmarSenha) {
    erroEl.textContent = 'As senhas não conferem.';
    return;
  }

  try {
    await api.post('/auth/register', { nome, email, senha, confirmarSenha });
    erroEl.dataset.type = 'success';
    erroEl.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
    window.setTimeout(() => {
      window.location.href = 'login.html';
    }, 900);
  } catch (err) {
    erroEl.removeAttribute('data-type');
    erroEl.textContent = err.message || 'Erro ao realizar cadastro.';
  }
});

document.querySelectorAll('.toggle-password').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const isPassword = input.type === 'password';

    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? 'Ocultar' : 'Mostrar';
    button.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
  });
});
