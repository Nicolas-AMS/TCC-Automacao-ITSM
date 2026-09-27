const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// POST /api/auth/login
router.post('/login', usuarioController.login);

// POST /api/auth/register - Aponta para o método 'criar' do controlador
router.post('/register', usuarioController.criar);

module.exports = router;
