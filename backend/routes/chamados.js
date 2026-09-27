const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, chamadoController.listar);
router.get('/:id', authMiddleware, chamadoController.buscarPorId);
router.post('/', authMiddleware, chamadoController.criar);

module.exports = router;
