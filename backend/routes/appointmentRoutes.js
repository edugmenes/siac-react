const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken')
const {
    appointmentScheduling,
    appointmentRescheduling,
    deleteAppointment,
    getAppointments,
    getAppointmentsById,
    getDatesAvailableToScheduling,
    getProfessionalsAvailableToScheduling,
    getAvailableHoursToScheduling
} = require('../controllers/appointmentController');


// Rotas para agendamento de consulta:
router.put('/scheduling', authenticateToken, appointmentScheduling);
router.put('/rescheduling/:recordId', authenticateToken, appointmentRescheduling);
router.get('/get', getAppointments);
router.get('/get/available/dates', getDatesAvailableToScheduling);
router.get('/get/professionals', getProfessionalsAvailableToScheduling);
router.get('/get/hours/:idAgenda', getAvailableHoursToScheduling);
router.get('/get/:recordId', getAppointmentsById);
router.delete('/delete', deleteAppointment);

module.exports = router;