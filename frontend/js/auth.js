const PAGINAS_AUTENTICADAS = [
  'dashboard.html',
  'chamados.html',
  'chamado.html',
  'diagnostico.html',
  'resultado.html',
];

function criarIcone(desenho) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('stroke-width', '1.7');

  desenho.forEach((atributos) => {
    const forma = document.createElementNS(
      'http://www.w3.org/2000/svg',
      atributos.tag
    );
    Object.entries(atributos).forEach(([nome, valor]) => {
      if (nome !== 'tag') forma.setAttribute(nome, valor);
    });
    svg.appendChild(forma);
  });

  return svg;
}

function criarLinkNavegacao(rotulo, destino, paginaAtual) {
  const item = document.createElement('li');
  item.className = 'nav-item';
  const link = document.createElement('a');
  link.className = 'nav-link authenticated-nav-link';
  link.href = destino;
  link.textContent = rotulo;

  if (paginaAtual === destino) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }

  item.appendChild(link);
  return item;
}

function obterNomeUsuario() {
  const token = localStorage.getItem('token');
  const partePayload = token?.split('.')[1];
  if (!partePayload) return '';

  try {
    const base64 = partePayload.replace(/-/g, '+').replace(/_/g, '/');
    const dados = Uint8Array.from(atob(base64), (caractere) =>
      caractere.charCodeAt(0)
    );
    const payload = JSON.parse(new TextDecoder().decode(dados));
    return typeof payload.nome === 'string' ? payload.nome.trim() : '';
  } catch (erro) {
    if (!(erro instanceof SyntaxError) && !(erro instanceof DOMException)) {
      throw erro;
    }
    return '';
  }
}

function montarNavegacaoAutenticada() {
  const nav = document.querySelector('.site-navbar');
  if (!nav || !localStorage.getItem('token')) return;

  nav.classList.add('authenticated-navbar', 'navbar-expand-xl');
  nav.classList.remove('navbar-expand-lg', 'navbar-expand-xxl');

  const container = document.createElement('div');
  container.className = 'container-fluid';

  const brand = nav.querySelector('.site-brand');
  if (brand) {
    brand.href = 'index.html';
    container.appendChild(brand);
  }

  const toggler = document.createElement('button');
  toggler.className = 'navbar-toggler';
  toggler.type = 'button';
  toggler.setAttribute('data-bs-toggle', 'collapse');
  toggler.setAttribute('data-bs-target', '#authenticated-navigation');
  toggler.setAttribute('aria-controls', 'authenticated-navigation');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Abrir ou fechar navegação');
  const togglerIcon = document.createElement('span');
  togglerIcon.className = 'navbar-toggler-icon';
  toggler.appendChild(togglerIcon);
  container.appendChild(toggler);

  const navigation = document.createElement('div');
  navigation.className = 'collapse navbar-collapse authenticated-navigation';
  navigation.id = 'authenticated-navigation';

  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.createElement('ul');
  links.className = 'navbar-nav site-nav-links me-auto';
  [
    ['Dashboard', 'dashboard.html'],
    ['Meus chamados', 'chamados.html'],
    ['Diagnóstico', 'diagnostico.html'],
  ].forEach(([rotulo, destino]) => {
    links.appendChild(criarLinkNavegacao(rotulo, destino, paginaAtual));
  });
  navigation.appendChild(links);

  const actions = document.createElement('div');
  actions.className = 'site-nav-actions authenticated-nav-actions';

  const search = document.createElement('form');
  search.className = 'site-search';
  search.action = 'chamados.html';
  search.method = 'get';
  search.setAttribute('role', 'search');
  const searchInput = document.createElement('input');
  searchInput.className = 'form-control';
  searchInput.type = 'search';
  searchInput.name = 'q';
  searchInput.placeholder = 'Buscar chamados';
  searchInput.setAttribute('aria-label', 'Buscar chamados');
  const searchButton = document.createElement('button');
  searchButton.className = 'site-icon-button';
  searchButton.type = 'submit';
  searchButton.setAttribute('aria-label', 'Buscar chamados');
  searchButton.appendChild(criarIcone([
    { tag: 'circle', cx: '10.8', cy: '10.8', r: '6.8' },
    { tag: 'path', d: 'm16 16 5 5' },
  ]));
  search.append(searchInput, searchButton);
  actions.appendChild(search);

  const language = document.createElement('span');
  language.className = 'site-language';
  language.setAttribute('aria-label', 'Idioma: Português');
  language.appendChild(criarIcone([
    { tag: 'circle', cx: '12', cy: '12', r: '9' },
    { tag: 'path', d: 'M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18' },
  ]));
  const languageLabel = document.createElement('span');
  languageLabel.textContent = 'PT';
  language.appendChild(languageLabel);
  actions.appendChild(language);

  const profile = document.createElement('div');
  profile.className = 'authenticated-profile';
  const profileButton = document.createElement('button');
  profileButton.className = 'authenticated-avatar';
  profileButton.type = 'button';
  profileButton.setAttribute('aria-label', 'Abrir menu do usuário');
  profileButton.setAttribute('aria-haspopup', 'true');
  profileButton.setAttribute('aria-expanded', 'false');
  profileButton.setAttribute('aria-controls', 'authenticated-profile-menu');
  const nomeUsuario = obterNomeUsuario();
  profileButton.textContent = nomeUsuario ? nomeUsuario.charAt(0).toLocaleUpperCase('pt-BR') : 'U';
  const menu = document.createElement('div');
  menu.className = 'authenticated-profile-menu';
  menu.id = 'authenticated-profile-menu';
  menu.hidden = true;
  const label = document.createElement('span');
  label.className = 'authenticated-profile-label';
  label.textContent = nomeUsuario || 'Minha conta';
  const logout = document.createElement('button');
  logout.className = 'authenticated-logout';
  logout.type = 'button';
  logout.textContent = 'Sair';
  profile.append(profileButton, menu);
  menu.append(label, logout);
  actions.appendChild(profile);

  const contactLink = document.createElement('a');
  contactLink.className = 'site-cta';
  contactLink.href = 'fale-conosco.html';
  contactLink.textContent = 'Fale conosco';
  actions.appendChild(contactLink);

  navigation.appendChild(actions);
  container.appendChild(navigation);
  nav.replaceChildren(container);

  function fecharMenu() {
    menu.hidden = true;
    profileButton.setAttribute('aria-expanded', 'false');
  }

  profileButton.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    profileButton.setAttribute('aria-expanded', String(!menu.hidden));
  });
  document.addEventListener('click', (evento) => {
    if (!profile.contains(evento.target)) fecharMenu();
  });
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && !menu.hidden) {
      fecharMenu();
      profileButton.focus();
    }
  });
  logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('paginaAposLogin');
    window.location.replace('index.html');
  });
}

if (localStorage.getItem('token')) {
  document.documentElement.classList.add('usuario-autenticado');
  document.addEventListener('DOMContentLoaded', montarNavegacaoAutenticada, { once: true });
}

function exigirLogin() {
  if (localStorage.getItem('token')) return true;

  const paginaAtual = window.location.pathname.split('/').pop();
  if (PAGINAS_AUTENTICADAS.includes(paginaAtual)) {
    sessionStorage.setItem('paginaAposLogin', paginaAtual);
  }
  window.location.replace('login.html');
  return false;
}

function redirecionarAposLogin() {
  const paginaSolicitada = sessionStorage.getItem('paginaAposLogin');
  sessionStorage.removeItem('paginaAposLogin');
  window.location.replace(
    PAGINAS_AUTENTICADAS.includes(paginaSolicitada) ? paginaSolicitada : 'dashboard.html'
  );
}
