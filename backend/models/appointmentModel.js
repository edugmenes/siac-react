const promisePool = require('../config/databaseConfig');

const registerAgenda = async (formValues) => {
    const { date, dayOfWeek, professional, initialTime, endTime } = formValues;

    try {
        const [result] = await promisePool.query(
            `INSERT INTO agenda (horaIni, horaFin, data, diaSemana, idUser) VALUES (?, ?, ?, ?, ?)`,
            [initialTime, endTime, date, dayOfWeek, professional]
        );

        // Captura o idAgenda do resultado da inserção
        const idAgenda = result.insertId;

        return {
            success: true,
            message: 'Cadastro de agenda realizado com sucesso!',
            data: { idAgenda }, // Retorna o idAgenda gerado
            formValues: formValues
        };
    } catch (error) {
        console.error("Erro ao simular cadastro de agenda:", error);
        return { success: false, message: "Erro ao simular cadastro de agenda", details: error.message };
    }
};

const registerHours = async (formValues, idUser, idAgenda) => {
    const { professional, initialTime } = formValues;
    const patient = idUser;
    const agenda = idAgenda;

    try {
        const [result] = await promisePool.query(
            `INSERT INTO horario (hora, idUser, disponibilidade, idAgenda, idPsico, status) VALUES (?, ?, ?, ?, ?, ?)`,
            [initialTime, patient, 1, agenda, professional, 'agendado']
        );

        return {
            success: true,
            message: 'Dados de horário cadastrados no banco!',
            result
        };
    } catch (error) {
        console.error("Erro ao cadastrar horários:", error);
        return { success: false, message: "Erro ao cadastrar horários:", details: error.message };
    }
};

const getAppointments = async () => {
    try {
        // Correção: Remova o uso de desestruturação que assume que o retorno é um array.
        const [appointments] = await promisePool.query(
            `SELECT * FROM horario WHERE status = 'agendado'`
        );

        // Correção: Verifique se appointments é um array antes de acessar a propriedade length.
        if (!Array.isArray(appointments) || appointments.length === 0) {
            return { success: false, message: 'Nenhuma consulta encontrada' };
        }

        console.log('app', appointments[0]);

        // Retorne todos os appointments se quiser devolver a lista completa; 
        // aqui o código original retornava apenas o primeiro item.
        return { success: true, data: appointments };
    } catch (error) {
        console.error('Erro ao buscar consultas: ', error);
        return { success: false, message: 'Erro ao buscar consultas', details: error.message };
    }
};

module.exports = {
    registerAgenda,
    registerHours,
    getAppointments
};
