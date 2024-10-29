const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken')
const { agendaController } = require('../controllers/agendaController');

// Rotas para agendamento de consulta:
router.post('/creation', authenticateToken, agendaController);

module.exports = router;