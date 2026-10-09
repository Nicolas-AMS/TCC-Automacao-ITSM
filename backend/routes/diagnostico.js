const express = require('express');
const router = express.Router();
const diagnosticoController = require('../controllers/diagnosticoController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/diagnostico  -> conversa passo a passo com a IA
router.post('/', authMiddleware, diagnosticoController.conversar);

module.exports = router;
