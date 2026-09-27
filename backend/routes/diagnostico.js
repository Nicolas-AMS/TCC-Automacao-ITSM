const express = require('express');
const router = express.Router();
const diagnosticoController = require('../controllers/diagnosticoController');

// POST /api/diagnostico  -> conversa passo a passo com a IA
router.post('/', diagnosticoController.conversar);

module.exports = router;
