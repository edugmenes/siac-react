const appointmentModel = require('../models/appointmentModel');

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

// Função para calcular a hora de término
const calculateEndTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number); // Divide a hora e os minutos
    const endTime = new Date();

    endTime.setHours(hours);
    endTime.setMinutes(minutes + 50); // Adiciona 50 minutos

    // Formata a hora final como "HH:mm"
    return endTime.toTimeString().slice(0, 5);
};

// Função para formatar a data
const formatDate = (date) => {
    const [day, month, year] = date.split('/').map(Number); // Divide a data
    const formattedDate = new Date(year, month - 1, day); // Cria uma nova data

    // Formata a data no formato 'YYYY-MM-DD' para o banco de dados
    return formattedDate.toISOString().split('T')[0];
};

// Função para obter o dia da semana em português
const getDayOfWeek = (date) => {
    const daysOfWeek = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ];

    // Divide a data em dia, mês e ano
    const [day, month, year] = date.split('/');

    // Cria um objeto Date com o formato YYYY-MM-DD
    const parsedDate = new Date(`${year}-${month}-${day}T00:00:00`);

    // Obtém o número do dia da semana (0-6) e retorna o nome correspondente
    return daysOfWeek[parsedDate.getDay()];
};

module.exports = {
    appointmentScheduling
};
