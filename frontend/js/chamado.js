if (exigirLogin()) {
  document.getElementById('form-chamado').addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;

    sessionStorage.setItem('relatoInicial', JSON.stringify({ titulo, descricao }));
    window.location.href = 'diagnostico.html';
  });
}
