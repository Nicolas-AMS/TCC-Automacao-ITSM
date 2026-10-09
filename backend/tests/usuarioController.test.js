const test = require('node:test');
const assert = require('node:assert/strict');

const db = require('../database/connection');
const usuarioController = require('../controllers/usuarioController');

function makeRes() {
  return {
    statusCode: null,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
}

test('login deve rejeitar credenciais vazias com 400', async () => {
  const originalQuery = db.query;
  db.query = async () => [[]];

  try {
    const req = { body: { email: '', senha: '' } };
    const res = makeRes();

    await usuarioController.login(req, res, () => {});

    assert.equal(res.statusCode, 400);
    assert.equal(res.payload.mensagem, 'E-mail e senha são obrigatórios');
  } finally {
    db.query = originalQuery;
  }
});

test('criar deve retornar 400 quando o e-mail já existe', async () => {
  const originalQuery = db.query;
  db.query = async () => {
    const err = new Error('duplicate entry');
    err.code = 'ER_DUP_ENTRY';
    throw err;
  };

  try {
    const req = {
      body: {
        nome: 'Ana',
        email: 'ana@teste.com',
        senha: '123456',
        confirmarSenha: '123456',
      },
    };
    const res = makeRes();

    await usuarioController.criar(req, res, () => {});

    assert.equal(res.statusCode, 400);
    assert.equal(res.payload.mensagem, 'Este e-mail já está cadastrado.');
  } finally {
    db.query = originalQuery;
  }
});

test('criar deve retornar 400 quando a confirmação da senha for diferente', async () => {
  const originalQuery = db.query;
  db.query = async () => {
    return [[]];
  };

  try {
    const req = {
      body: {
        nome: 'Ana',
        email: 'ana@teste.com',
        senha: '123456',
        confirmarSenha: '654321',
      },
    };
    const res = makeRes();

    await usuarioController.criar(req, res, () => {});

    assert.equal(res.statusCode, 400);
    assert.equal(res.payload.mensagem, 'As senhas não conferem.');
  } finally {
    db.query = originalQuery;
  }
});
