const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken')
const {
    appointmentScheduling,
    deleteAppointment,
    getAppointments,
    getAppointmentsById
} = require('../controllers/appointmentController');


// Rotas para agendamento de consulta:
router.post('/scheduling', authenticateToken, appointmentScheduling);
router.get('/get', getAppointments)
router.get('/get/:recordId', getAppointmentsById)
router.delete('/delete', deleteAppointment)

module.exports = router;