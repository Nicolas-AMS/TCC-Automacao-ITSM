document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const erroEl = document.getElementById('erro-login');
  erroEl.textContent = '';

  if (!email || !senha) {
    erroEl.textContent = 'Informe e-mail e senha.';
    return;
  }

  try {
    const { token } = await api.post('/auth/login', { email, senha });
    localStorage.setItem('token', token);
    redirecionarAposLogin();
  } catch (err) {
    erroEl.textContent = err.message;
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
