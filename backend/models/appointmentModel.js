const promisePool = require("../config/databaseConfig");

const registerAgenda = async (formValues) => {
  const { date, dayOfWeek, professional, initialTime, endTime } = formValues;

  try {
    const [result] = await promisePool.query(
      `INSERT INTO agenda (horaIni, horaFin, data, diaSemana, idUser) VALUES (?, ?, ?, ?, ?)`,
      [initialTime, endTime, date, dayOfWeek, professional]
    );

    const idAgenda = result.insertId;

    return {
      success: true,
      message: "Cadastro de agenda realizado com sucesso!",
      data: { idAgenda },
      formValues: formValues,
    };
  } catch (error) {
    console.error("Erro ao simular cadastro de agenda:", error);
    return {
      success: false,
      message: "Erro ao simular cadastro de agenda",
      details: error.message,
    };
  }
};

const registerHours = async (formValues, idUser, idAgenda) => {
  const { professional, initialTime } = formValues;
  const patient = idUser;
  const agenda = idAgenda;

  try {
    const [result] = await promisePool.query(
      `INSERT INTO horario (hora, idUser, disponibilidade, idAgenda, idPsico, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [initialTime, patient, 1, agenda, professional, "agendado"]
    );

    return {
      success: true,
      message: "Dados de horário cadastrados no banco!",
      result,
    };
  } catch (error) {
    console.error("Erro ao cadastrar horários:", error);
    return {
      success: false,
      message: "Erro ao cadastrar horários:",
      details: error.message,
    };
  }
};

const getAppointments = async () => {
  try {
    const [appointments] = await promisePool.query(
      `SELECT * FROM horario WHERE status = 'agendado'`
    );

    if (!Array.isArray(appointments) || appointments.length === 0) {
      return { success: false, message: "Nenhuma consulta encontrada" };
    }

    return { success: true, data: appointments };
  } catch (error) {
    console.error("Erro ao buscar consultas: ", error);
    return {
      success: false,
      message: "Erro ao buscar consultas",
      details: error.message,
    };
  }
};

module.exports = {
  registerAgenda,
  registerHours,
  getAppointments,
};
