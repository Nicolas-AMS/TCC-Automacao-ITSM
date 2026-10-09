const test = require('node:test');
const assert = require('node:assert/strict');

const db = require('../database/connection');
const contatoController = require('../controllers/contatoController');

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

test('criar deve rejeitar campos obrigatórios ausentes sem acessar o banco', async () => {
  const originalQuery = db.query;
  db.query = async () => {
    throw new Error('A consulta não deveria ser executada');
  };

  try {
    const res = makeRes();
    await contatoController.criar({ body: { nome: '', email: '', mensagem: '' } }, res, () => {});

    assert.equal(res.statusCode, 400);
    assert.equal(res.payload.mensagem, 'Preencha todos os campos obrigatórios.');
  } finally {
    db.query = originalQuery;
  }
});

test('criar deve rejeitar um endereço de e-mail inválido', async () => {
  const res = makeRes();
  await contatoController.criar({
    body: { nome: 'Ana', email: 'email-invalido', assunto: 'Ajuda', mensagem: 'Preciso de suporte.' },
  }, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.payload.mensagem, 'Informe um endereço de e-mail válido.');
});

test('criar deve persistir dados normalizados e retornar 201', async () => {
  const originalQuery = db.query;
  let parametrosSalvos;
  db.query = async (sql, parametros) => {
    assert.match(sql, /INSERT INTO solicitacoes_contato/);
    parametrosSalvos = parametros;
    return [{ insertId: 42 }];
  };

  try {
    const res = makeRes();
    await contatoController.criar({
      body: {
        nome: ' Ana Silva ',
        email: ' ANA@EXEMPLO.COM ',
        telefone: '  ',
        empresa: ' Equipe de TI ',
        assunto: ' Acesso e conta ',
        mensagem: ' Preciso de ajuda. ',
      },
    }, res, () => {});

    assert.equal(res.statusCode, 201);
    assert.deepEqual(parametrosSalvos, [
      'Ana Silva',
      'ana@exemplo.com',
      null,
      'Equipe de TI',
      'Acesso e conta',
      'Preciso de ajuda.',
    ]);
    assert.equal(res.payload.id, 42);
  } finally {
    db.query = originalQuery;
  }
});
