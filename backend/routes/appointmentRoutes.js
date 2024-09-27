const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken')
const { appointmentScheduling } = require('../controllers/appointmentController');

// Rotas para agendamento de consulta:
router.post('/scheduling', authenticateToken, appointmentScheduling);

module.exports = router;