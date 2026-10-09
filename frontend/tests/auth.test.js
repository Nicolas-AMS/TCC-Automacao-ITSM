const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const authScript = fs.readFileSync(path.join(__dirname, '../js/auth.js'), 'utf8');

function criarContexto(token = null) {
  const dadosSessao = new Map();
  const navegacao = [];
  const classesDocumento = new Set();
  const eventosDocumento = [];
  const location = {
    pathname: '/chamado.html',
    replace(destino) {
      navegacao.push(destino);
    },
  };
  const context = {
    document: {
      documentElement: {
        classList: {
          add: (classe) => classesDocumento.add(classe),
        },
      },
      addEventListener: (...argumentos) => eventosDocumento.push(argumentos),
    },
    localStorage: {
      getItem: (chave) => (chave === 'token' ? token : null),
    },
    sessionStorage: {
      getItem: (chave) => dadosSessao.get(chave) ?? null,
      setItem: (chave, valor) => dadosSessao.set(chave, valor),
      removeItem: (chave) => dadosSessao.delete(chave),
    },
    window: { location },
  };
  vm.runInNewContext(authScript, context);
  return { context, dadosSessao, navegacao, classesDocumento, eventosDocumento };
}

test('exigirLogin redireciona visitantes e preserva a página solicitada', () => {
  const { context, dadosSessao, navegacao } = criarContexto();

  assert.equal(vm.runInNewContext('exigirLogin()', context), false);
  assert.equal(dadosSessao.get('paginaAposLogin'), 'chamado.html');
  assert.deepEqual(navegacao, ['login.html']);
});

test('exigirLogin permite continuar quando há token', () => {
  const { context, navegacao, classesDocumento, eventosDocumento } = criarContexto('jwt-valido');

  assert.equal(vm.runInNewContext('exigirLogin()', context), true);
  assert.equal(classesDocumento.has('usuario-autenticado'), true);
  assert.equal(eventosDocumento.length, 1);
  assert.equal(eventosDocumento[0][0], 'DOMContentLoaded');
  assert.deepEqual(navegacao, []);
});

test('não marca visitante como autenticado quando não há token', () => {
  const { classesDocumento } = criarContexto();

  assert.equal(classesDocumento.has('usuario-autenticado'), false);
});

test('redirecionarAposLogin retorna à página protegida solicitada', () => {
  const { context, dadosSessao, navegacao } = criarContexto();
  dadosSessao.set('paginaAposLogin', 'chamado.html');

  vm.runInNewContext('redirecionarAposLogin()', context);

  assert.deepEqual(navegacao, ['chamado.html']);
  assert.equal(dadosSessao.has('paginaAposLogin'), false);
});

test('redirecionarAposLogin não aceita destinos fora da lista protegida', () => {
  const { context, navegacao } = criarContexto();
  context.sessionStorage.setItem('paginaAposLogin', 'https://exemplo.com');

  vm.runInNewContext('redirecionarAposLogin()', context);

  assert.deepEqual(navegacao, ['dashboard.html']);
});
