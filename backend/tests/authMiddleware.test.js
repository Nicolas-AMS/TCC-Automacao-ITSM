const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/authMiddleware');

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

test('authMiddleware deve rejeitar requisições sem token', () => {
  const req = { headers: {} };
  const res = makeRes();
  let chamouNext = false;

  authMiddleware(req, res, () => {
    chamouNext = true;
  });

  assert.equal(res.statusCode, 401);
  assert.equal(chamouNext, false);
});

test('authMiddleware deve rejeitar tokens inválidos', () => {
  const req = { headers: { authorization: 'Bearer token-invalido' } };
  const res = makeRes();
  let chamouNext = false;

  authMiddleware(req, res, () => {
    chamouNext = true;
  });

  assert.equal(res.statusCode, 401);
  assert.equal(chamouNext, false);
});

test('authMiddleware deve permitir um token válido e disponibilizar o usuário', () => {
  const segredoOriginal = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'segredo-de-teste';

  try {
    const usuario = { id: 7, email: 'ana@teste.com' };
    const token = jwt.sign(usuario, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = makeRes();
    let chamouNext = false;

    authMiddleware(req, res, () => {
      chamouNext = true;
    });

    assert.equal(chamouNext, true);
    assert.equal(req.usuario.id, usuario.id);
    assert.equal(req.usuario.email, usuario.email);
  } finally {
    if (segredoOriginal === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = segredoOriginal;
    }
  }
});
