const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/connection');

module.exports = {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
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

      res.json({ token });
    } catch (err) {
      next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const { nome, email, senha } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);
      const [resultado] = await db.query(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
        [nome, email, senhaHash]
      );
      res.status(201).json({ id: resultado.insertId, nome, email });
    } catch (err) {
      next(err);
    }
  },

  async listar(req, res, next) {
    try {
      const [rows] = await db.query('SELECT id, nome, email, criado_em FROM usuarios');
      res.json(rows);
    } catch (err) {
      next(err);
    }
  },
    async criar(req, res, next) {
    try {
      const { nome, email, senha } = req.body;
      
      // Validação básica se os dados vieram na requisição
      if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const [resultado] = await db.query(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
        [nome, email, senhaHash]
      );
      res.status(201).json({ id: resultado.insertId, nome, email });
    } catch (err) {
      // Captura erro de e-mail duplicado no banco de dados
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ mensagem: 'Este e-mail já está cadastrado.' });
      }
      next(err);
    }
  },

};
