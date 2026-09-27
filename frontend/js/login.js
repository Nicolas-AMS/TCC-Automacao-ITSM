document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const erroEl = document.getElementById('erro-login');
  erroEl.textContent = '';

  try {
    const { token } = await api.post('/auth/login', { email, senha });
    localStorage.setItem('token', token);
    window.location.href = 'dashboard.html';
  } catch (err) {
    erroEl.textContent = err.message;
  }
});
