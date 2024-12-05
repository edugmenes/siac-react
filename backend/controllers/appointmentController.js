const {
    formatDate,
    getDayOfWeek,
    calculateEndTime,
    calculateTimeIntervals
} = require('../middleware/dateTimeFunctions');
const appointmentModel = require('../models/appointmentModel');

const agendaCreation = async (request, response) => {
    const { agendas } = request.body;
    const { idUser } = request.user;

    if (!agendas || agendas.length === 0) {
        return response.status(400).json({ message: 'Nenhuma agenda foi adicionada.' });
    }

    const formattedAgendaIntervals = calculateTimeIntervals(agendas);

    try {
        // Iterar sobre cada agenda no array formattedAgendaIntervals
        for (const agenda of formattedAgendaIntervals) {
            const { data, horaInicio, horaFim, diaSemana, intervalos } = agenda;

            // Registrar a agenda e capturar o idAgenda
            const formattedDate = formatDate(data);
            const agendaResult = await appointmentModel.registerAgenda({
                date: formattedDate,
                dayOfWeek: diaSemana,
                professional: idUser,
                initialTime: horaInicio,
                endTime: horaFim
            });

            if (!agendaResult.success) {
                throw new Error(`Erro ao registrar agenda: ${agendaResult.message}`);
            }

            const { idAgenda } = agendaResult.data; // Captura o ID da agenda registrada

            // Iterar sobre os horários e registrar cada um associado à agenda
            for (const time of intervalos) {
                const horarioResult = await appointmentModel.registerHours({
                    professional: idUser,
                    initialTime: time,
                    disponibilidade: 0,
                    status: 'Disponível'
                }, idUser, idAgenda);

                if (!horarioResult.success) {
                    throw new Error(`Erro ao registrar horário: ${horarioResult.message}`);
                }
            }
        }

        // Retornar sucesso se todas as operações forem concluídas
        return response.status(201).json({ message: 'Agendas e horários criados com sucesso!' });
    } catch (error) {
        // Retornar erro caso qualquer etapa falhe
        return response.status(500).json({ message: error.message });
    }
};

const appointmentScheduling = async (request, response) => {
    const { date, professional, time } = request.body;
    const disponibilidade = 1;
    const status = 'Agendada';
    const idUser = request.user.idUser;

    try {
        // Formatar a data e calcular a hora de término
        const formattedDate = formatDate(date);
        const dayOfWeek = getDayOfWeek(date);
        const endTime = calculateEndTime(time);

        // Registrar a agenda e capturar o idAgenda
        const agendaResult = await appointmentModel.registerAgenda({
            date: formattedDate,
            dayOfWeek: dayOfWeek,
            professional,
            initialTime: time,
            endTime: endTime
        });

        if (!agendaResult.success) {
            return response.status(400).json({ message: agendaResult.message, formValues: agendaResult.formValues });
        }

        const { idAgenda } = agendaResult.data; // Captura o id da agenda criada

        // Registrar o horário com o idAgenda
        const horarioResult = await appointmentModel.registerHours({
            professional,
            initialTime: time,
            disponibilidade,
            status
        }, idUser, idAgenda);

        if (horarioResult.success) {
            return response.status(201).json({ message: horarioResult.message, data: horarioResult.data });
        } else {
            return response.status(400).json({ message: horarioResult.message });
        }
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const appointmentRescheduling = async (request, response) => {
    const { date, professional, time } = request.body;
    const idUser = request.user.idUser;
    const disponibilidade = 1;
    const status = 'Remarcada';

    console.log("Chegou na controller");
    console.log(request.body);
    try {
        // Formatar a data e calcular a hora de término
        const formattedDate = formatDate(date);
        const dayOfWeek = getDayOfWeek(date);
        const endTime = calculateEndTime(time);

        // Registrar a agenda e capturar o idAgenda
        const agendaResult = await appointmentModel.registerAgenda({
            date: formattedDate,
            dayOfWeek: dayOfWeek,
            professional,
            initialTime: time,
            endTime: endTime
        });

        if (!agendaResult.success) {
            return response.status(400).json({ message: agendaResult.message, formValues: agendaResult.formValues });
        }

        const { idAgenda } = agendaResult.data; // Captura o id da agenda criada

        // Registrar o horário com o idAgenda
        const horarioResult = await appointmentModel.registerHours({
            professional,
            initialTime: time,
            disponibilidade,
            status
        }, idUser, idAgenda);

        if (horarioResult.success) {
            return response.status(201).json({ message: horarioResult.message, data: horarioResult.data });
        } else {
            return response.status(400).json({ message: horarioResult.message });
        }
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const getAppointments = async (request, response) => {
    try {
        const appointments = await appointmentModel.getAppointments();

        if (!appointments || appointments.length === 0) {
            console.log('No appointments found.');
            return response.status(404).json({ message: 'Nenhuma consulta encontrada' });
        }

        response.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        response.status(500).json({
            message: 'Não foi possível buscar consultas',
            details: error.message,
        });
    }
};

const getAppointmentsById = async (request, response) => {
    const { recordId } = request.params;

    try {
        const appointments = await appointmentModel.getAppointmentsById(recordId);

        if (!appointments || appointments.length === 0) {
            console.log('No appointments found.');
            return response.status(404).json({ message: 'Nenhuma consulta encontrada' });
        }

        response.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        response.status(500).json({
            message: 'Não foi possível buscar consultas',
            details: error.message,
        });
    }
};

const getDatesAvailableToScheduling = async (request, response) => {
    try {
        const datesAvailable = await appointmentModel.getAppointmentDatesAvailable();

        if (!datesAvailable || datesAvailable.length === 0) {
            console.log('No appointments found.');
            return response.status(404).json({ message: 'Nenhuma consulta encontrada' });
        }

        response.status(200).json(datesAvailable);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        response.status(500).json({
            message: 'Não foi possível buscar consultas',
            details: error.message,
        });
    }
}

const getAvailableHoursToScheduling = async (request, response) => {
    const { idAgenda } = request.params;

    try {
        const hoursAvailable = await appointmentModel.getAgendaAvailableHours(idAgenda);

        if (!hoursAvailable || hoursAvailable.length === 0) {
            console.log('No hours found.');
            return response.status(404).json({ message: 'Nenhum horário encontrado.' });
        }

        response.status(200).json(hoursAvailable);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        response.status(500).json({
            message: 'Não foi possível buscar horários',
            details: error.message,
        });
    }
}

const deleteAppointment = async (request, response) => {
    const { idHorario } = request.body;

    try {
        await appointmentModel.deleteAppointment(idHorario);
        return response
            .status(200)
            .json({ message: "Consulta excluida com sucesso!" });
    } catch (error) {
        return response
            .status(500)
            .json({ message: "Erro ao excluir consulta" });
    }
};

module.exports = {
    appointmentScheduling,
    appointmentRescheduling,
    agendaCreation,
    getAppointments,
    getAppointmentsById,
    deleteAppointment,
    getDatesAvailableToScheduling,
    getAvailableHoursToScheduling
};
