// Wrapper simples para chamadas a API do backend
const API_BASE_URL = 'http://localhost:3000/api';

const api = {
  async _fetch(path, options = {}) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      const erro = await res.json().catch(() => ({}));
      throw new Error(erro.mensagem || `Erro na requisicao (${res.status})`);
    }
    return res.json();
  },
  get(path) {
    return this._fetch(path, { method: 'GET' });
  },
  post(path, body) {
    return this._fetch(path, { method: 'POST', body: JSON.stringify(body) });
  },
};
