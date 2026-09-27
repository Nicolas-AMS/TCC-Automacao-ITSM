const db = require('../database/connection');
const itsmService = require('../services/itsmService');

module.exports = {
  async listar(req, res, next) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM chamados WHERE usuario_id = ? ORDER BY criado_em DESC',
        [req.usuario.id]
      );
      res.json(rows);
    } catch (err) {
      next(err);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const [rows] = await db.query('SELECT * FROM chamados WHERE id = ?', [req.params.id]);
      if (!rows[0]) return res.status(404).json({ mensagem: 'Chamado nao encontrado' });
      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const { titulo, resumo, categoria, prioridade } = req.body;

      const [resultado] = await db.query(
        `INSERT INTO chamados (usuario_id, titulo, resumo, categoria, prioridade, status)
         VALUES (?, ?, ?, ?, ?, 'Aberto')`,
        [req.usuario.id, titulo, resumo, categoria, prioridade]
      );

      // Envia para a plataforma ITSM externa (se configurada)
      const ticketExterno = await itsmService.criarTicket({
        titulo, resumo, categoria, prioridade,
      });

      res.status(201).json({ id: resultado.insertId, ticketExterno });
    } catch (err) {
      next(err);
    }
  },
};
