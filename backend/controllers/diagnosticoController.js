const iaService = require('../services/iaService');
const diagnosticoService = require('../services/diagnosticoService');

module.exports = {
  // Conduz a conversa de diagnostico turno a turno com a IA
  async conversar(req, res, next) {
    try {
      const { titulo, descricao, historico } = req.body;

      const respostaIA = await iaService.conversar({ titulo, descricao, historico });

      if (respostaIA.finalizado) {
        const diagnostico = await diagnosticoService.montarRelatorio({
          titulo, descricao, historico, respostaIA,
        });
        return res.json({
          mensagem: respostaIA.mensagem,
          finalizado: true,
          diagnostico,
        });
      }

      res.json({ mensagem: respostaIA.mensagem, finalizado: false });
    } catch (err) {
      next(err);
    }
  },
};
