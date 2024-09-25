const express = require('express');
const router = express.Router();

const { appointmentSchedule } = require('../controllers/appointmentsController');

// Rotas para agendamento de consulta:
router.post('/schedule', appointmentSchedule);

module.exports = router;