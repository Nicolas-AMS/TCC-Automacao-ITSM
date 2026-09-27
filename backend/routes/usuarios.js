const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, usuarioController.listar);
router.post('/', usuarioController.criar);

module.exports = router;
