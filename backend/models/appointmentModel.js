const promisePool = require('../config/databaseConfig');

const registerAgenda = async (formValues) => {
    const { date, professional, time, idUser } = formValues;

    try {
        const [existingRegister] = await promisePool.query(
            `SELECT * FROM agenda 
             WHERE data = ?
                AND horaIni = ?
                AND idUser = ?`,
            [date, time, professional]
        );

        if (existingRegister.length > 0) {
            throw new Error('Essa data e horários não estão disponíveis para esse profissional.');
        }

        const [result] = await promisePool.query(
            `INSERT INTO agenda (horaIni, horaFin, data, diaSemana, idUser) VALUES (?, ?, ?, ?, ?)`,
            [time, null, date, null, professional]
        );

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: 'Sucesso ao cadastrar agenda.',
                data: result
            };
        } else {
            throw new Error('Falha ao cadastrar agenda.');
        }
    } catch (error) {
        console.error("Erro ao cadastrar agenda:", error);
        return { success: false, message: "Erro ao cadastrar agenda", details: error.message };
    }
};

const registerHours = async (formValues, idAgenda) => {
    const { professional, time } = formValues;

    try {
        const [result] = await promisePool.query(
            `INSERT INTO horario (hora, idUser, disponibilidade, idAgenda, idPsico, status) VALUES (?, ?, ?, ?, ?)`,
            []
        );

        return { sucess: true, message: 'Dados de horario cadastrados no banco!' };
    } catch (error) {
        console.error("Erro ao cadastrar horários:", error);
        return { success: false, message: "Erro ao cadastrar horários:", details: error.message };
    }
};

module.exports = {
    registerAgenda,
    registerHours
};