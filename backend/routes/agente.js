const express = require('express');
const router = express.Router();
const agenteController = require('../controllers/agenteController');

// POST /api/agente/dados -> recebe dados coletados pelo agente Python
router.post('/dados', agenteController.receberDados);

module.exports = router;
