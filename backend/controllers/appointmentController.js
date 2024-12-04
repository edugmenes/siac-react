const { formatDate, getDayOfWeek } = require('../middleware/dateTimeFunctions');
const appointmentModel = require('../models/appointmentModel');

const agendaCreation = async (request, response) => {
    const { agendas } = request.body;
    const { idUser } = request.user;

    if (!agendas || agendas.length === 0) {
        return response.status(400).json({ message: 'Nenhuma agenda foi adicionada.' });
    }

    try {
        // Executa todas as operações de criação de agenda em paralelo
        const agendaResult = await Promise.all(
            formattedAgendaIntervals.map(async ({ data, horaInicio, horaFim, diaSemana, intervalos }) => {
                const formattedDate = formatDate(data);
                const result = await appointmentModel.registerAgenda({
                    date: formattedDate,
                    dayOfWeek: diaSemana,
                    professional: idUser,
                    initialTime: horaInicio,
                    endTime: horaFim
                });
                return result.message; // Coleta a mensagem de cada registro
            })
        );

        return response.status(201).json({
            messages: agendaResults // Inclui todas as mensagens no campo 'messages'
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const appointmentScheduling = async (request, response) => {
    const { date, professional, time } = request.body;
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
        const horarioResult = await appointmentModel.registerHours({ professional, initialTime: time }, idUser, idAgenda);

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
        const horarioResult = await appointmentModel.registerHours({ professional, initialTime: time }, idUser, idAgenda);

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
    //console.log('Chegou na controller para getAppointments');
    try {
        // Chame o método do modelo e verifique o retorno
        const appointments = await appointmentModel.getAppointments();
        //console.log('Resultado da model que bateu na controller getAppointments:', appointments);

        // Verifique se o dado é válido e não está vazio
        if (!appointments || appointments.length === 0) {
            console.log('No appointments found.');
            return response.status(404).json({ message: 'Nenhuma consulta encontrada' });
        }

        // Se houver dados, envie a resposta com status 200
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
        // Chame o método do modelo e verifique o retorno
        const appointments = await appointmentModel.getAppointmentsById(recordId);

        // Verifique se o dado é válido e não está vazio
        if (!appointments || appointments.length === 0) {
            console.log('No appointments found.');
            return response.status(404).json({ message: 'Nenhuma consulta encontrada' });
        }

        // Se houver dados, envie a resposta com status 200
        response.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        response.status(500).json({
            message: 'Não foi possível buscar consultas',
            details: error.message,
        });
    }
};

// Função para calcular a hora de término
const calculateEndTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number); // Divide a hora e os minutos
    const endTime = new Date();

    endTime.setHours(hours);
    endTime.setMinutes(minutes + 50); // Adiciona 50 minutos

    // Formata a hora final como "HH:mm"
    return endTime.toTimeString().slice(0, 5);
};

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
    deleteAppointment
};
