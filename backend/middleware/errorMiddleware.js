module.exports = function errorMiddleware(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    mensagem: err.message || 'Erro interno do servidor',
  });
};
