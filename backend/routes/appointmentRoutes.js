const express = require('express');
const router = express.Router();

const { appointmentAgenda, appointmentHours } = require('../controllers/appointmentController');

// Rotas para agendamento de consulta:
router.post('/scheduling', appointmentAgenda);
router.post('/scheduling', appointmentHours);

module.exports = router;