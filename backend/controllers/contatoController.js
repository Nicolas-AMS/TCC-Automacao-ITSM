const db = require('../database/connection');

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = {
  async criar(req, res, next) {
    try {
      const nome = String(req.body?.nome || '').trim();
      const email = String(req.body?.email || '').trim().toLowerCase();
      const telefone = String(req.body?.telefone || '').trim();
      const empresa = String(req.body?.empresa || '').trim();
      const assunto = String(req.body?.assunto || '').trim();
      const mensagem = String(req.body?.mensagem || '').trim();

      if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
      }

      if (!emailValido.test(email)) {
        return res.status(400).json({ mensagem: 'Informe um endereço de e-mail válido.' });
      }

      if (nome.length > 150 || email.length > 150 || telefone.length > 30
        || empresa.length > 150 || assunto.length > 150 || mensagem.length > 3000) {
        return res.status(400).json({ mensagem: 'Um ou mais campos excedem o tamanho permitido.' });
      }

      const [resultado] = await db.query(
        `INSERT INTO solicitacoes_contato (nome, email, telefone, empresa, assunto, mensagem)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nome, email, telefone || null, empresa || null, assunto, mensagem]
      );

      return res.status(201).json({ id: resultado.insertId, mensagem: 'Mensagem registrada com sucesso.' });
    } catch (err) {
      return next(err);
    }
  },
};
