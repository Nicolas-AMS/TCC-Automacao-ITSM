const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/connection');

module.exports = {
  async login(req, res, next) {
    try {
      const email = String(req.body?.email || '').trim();
      const senha = String(req.body?.senha || '');

      if (!email || !senha) {
        return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios' });
      }

      const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      const usuario = rows[0];

      if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
        return res.status(401).json({ mensagem: 'E-mail ou senha invalidos' });
      }

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const nome = String(req.body?.nome || '').trim();
      const email = String(req.body?.email || '').trim();
      const senha = String(req.body?.senha || '');
      const confirmarSenha = String(req.body?.confirmarSenha || '');

      if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
      }

      if (senha !== confirmarSenha) {
        return res.status(400).json({ mensagem: 'As senhas não conferem.' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const [resultado] = await db.query(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
        [nome, email, senhaHash]
      );

      return res.status(201).json({ id: resultado.insertId, nome, email });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ mensagem: 'Este e-mail já está cadastrado.' });
      }

      return next(err);
    }
  },

  async listar(req, res, next) {
    try {
      const [rows] = await db.query('SELECT id, nome, email, criado_em FROM usuarios');
      return res.json(rows);
    } catch (err) {
      return next(err);
    }
  },
};
