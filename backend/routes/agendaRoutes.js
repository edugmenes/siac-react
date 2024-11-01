const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken')
const { agendaCreation } = require('../controllers/appointmentController');

// Rotas para agendamento de consulta:
router.post('/creation', authenticateToken, agendaCreation);

module.exports = router;