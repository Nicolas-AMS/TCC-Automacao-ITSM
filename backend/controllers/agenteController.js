const diagnosticoService = require('../services/diagnosticoService');

module.exports = {
  // Recebe os dados tecnicos coletados pelo agente Python (monitor.py -> envio.py)
  async receberDados(req, res, next) {
    try {
      const dadosTecnicos = req.body;
      await diagnosticoService.registrarDadosTecnicos(dadosTecnicos);
      res.status(201).json({ mensagem: 'Dados recebidos com sucesso' });
    } catch (err) {
      next(err);
    }
  },
};
