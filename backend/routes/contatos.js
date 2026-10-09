const express = require('express');
const contatoController = require('../controllers/contatoController');

const router = express.Router();

router.post('/', contatoController.criar);

module.exports = router;
