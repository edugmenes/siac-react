const appointmentModel = require('../models/appointmentModel');

const appointmentScheduling = async (request, response) => {
    const { date, professional, time } = request.body;
    const idUser = request.user.idUser;

    try {
        // Registrar a agenda e capturar o idAgenda
        const agendaResult = await appointmentModel.registerAgenda({ date, professional, time, idUser });

        if (!agendaResult.success) {
            return response.status(400).json({ message: agendaResult.message });
        }

        const { idAgenda } = agendaResult.data; // Captura o id da agenda criada

        // Registrar o horário com o idAgenda
        const horarioResult = await appointmentModel.registerHours(scheduleFormValues, idAgenda, authToken);

        if (horarioResult.success) {
            return response.status(201).json({ message: 'Consulta agendada com sucesso!', data: horarioResult.data });
        } else {
            return response.status(400).json({ message: horarioResult.message });
        }
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

module.exports = {
    appointmentScheduling
};
