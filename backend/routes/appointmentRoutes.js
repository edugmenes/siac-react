const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken')
const { appointmentScheduling } = require('../controllers/appointmentController');
const { getAppointments } = require('../models/appointmentModel');

// Rotas para agendamento de consulta:
router.post('/scheduling', authenticateToken, appointmentScheduling);

router.get('/get', getAppointments)

module.exports = router;