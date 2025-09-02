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
    console.log("Chegou na controller: ", request.body);
    const idUser = request.user.idUser;
    const { timeId, room } = request.body;
    const disponibilidade = 1;
    const status = 'Agendada';

    try {
        // Registrar a agenda e capturar o idAgenda
        const agendaResult = await appointmentModel.updateHourStatus({
            idUser: idUser,
            idHorario: timeId,
            sala: room,
            disponibilidade: disponibilidade,
            status: status
        });

        if (agendaResult.success) {
            return response.status(201).json({ message: agendaResult.message, data: agendaResult.data });
        } else {
            return response.status(400).json({ message: agendaResult.message });
        }
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const appointmentRescheduling = async (request, response) => {
    console.log("Chegou na controller: ", request.body);
    const { idUser, timeId, room } = request.body;
    const disponibilidade = 1;
    const status = 'Remarcada';
    const { recordId } = request.params;

    try {
        // Inicia as duas promessas em paralelo
        const [reschedulingResult, hourAvailableResult] = await Promise.all([
            appointmentModel.updateHourStatus({
                idUser: idUser,
                idHorario: timeId,
                sala: room,
                disponibilidade: disponibilidade,
                status: status
            }),

            appointmentModel.setHourAvailable({
                idHorario: recordId,
            })
        ]);

        // Verifica se ambas as operações foram bem-sucedidas
        if (reschedulingResult.success && hourAvailableResult.success) {
            return response.status(200).json({ message: reschedulingResult.message, data: reschedulingResult.data });
        } else {
            return response.status(400).json({ message: reschedulingResult.message });
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

const getProfessionalsAvailableToScheduling = async (request, response) => {
    const { ids } = request.query;
    const idAgendas = ids ? ids.split(',') : [];

    try {
        if (!Array.isArray(idAgendas) || idAgendas.length === 0) {
            return response.status(400).json({ message: 'Nenhuma agenda fornecida.' });
        }

        const psicosAvailable = [];  // Declara a variável uma vez fora do loop

        for (const idAgenda of idAgendas) {
            const result = await appointmentModel.getAgendaAvailablePsicos(idAgenda);

            if (result.success) {
                console.log(result);
                psicosAvailable.push(...result.data);  // Adiciona os profissionais encontrados
            }
        }

        if (psicosAvailable.length === 0) {
            return response.status(404).json({ message: 'Nenhum profissional encontrado.' });
        }

        // Retorna os profissionais encontrados
        response.status(200).json({ success: true, data: psicosAvailable });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        response.status(500).json({
            message: 'Não foi possível buscar profissionais.',
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
    getAvailableHoursToScheduling,
    getProfessionalsAvailableToScheduling
};
