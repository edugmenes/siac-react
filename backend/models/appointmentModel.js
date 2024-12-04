const promisePool = require("../config/databaseConfig");

// const getAvailableAgendas = async (formValues) => {
//   const ( )

// }

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
  const { professional, initialTime, disponibilidade, status } = formValues;
  const patient = idUser;
  const agenda = idAgenda;

  try {
    const [result] = await promisePool.query(
      `INSERT INTO horario (hora, idUser, disponibilidade, idAgenda, idPsico, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [initialTime, patient, disponibilidade, agenda, professional, status]
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

const registerAgendaHours = async (formValues, idUser, idAgenda) => {
  const { professional, initialTime, finalTime, breakStart, breakEnd } = formValues;
  const patient = idUser;
  const agenda = idAgenda;

  try {
    // Converte horários para objetos Date para facilitar os cálculos
    const startTime = new Date(`1970-01-01T${initialTime}:00`);
    const endTime = new Date(`1970-01-01T${finalTime}:00`);
    const lunchStart = new Date(`1970-01-01T${breakStart}:00`);
    const lunchEnd = new Date(`1970-01-01T${breakEnd}:00`);

    const horarios = []; // Lista para armazenar os horários a serem inseridos
    let currentTime = startTime;

    while (currentTime < endTime) {

      // Ignorar horários no intervalo de almoço
      if (currentTime >= lunchStart && currentTime < lunchEnd) {
        currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Pula uma hora
        continue;
      }

      horarios.push(currentTime.toTimeString().slice(0, 5)); // Formata para "HH:MM"
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Adiciona 1 hora
    }

    // Prepara os valores para inserir na tabela horario
    const insertPromises = horarios.map(async (hora) => {
      return promisePool.query(
        `INSERT INTO horario (hora, idUser, disponibilidade, idAgenda, idPsico, status) VALUES (?, ?, ?, ?, ?, ?)`,
        [hora, null, 0, agenda, professional, "Disponível"]
      );
    });

    // Executa todas as inserções em paralelo
    await Promise.all(insertPromises);

    return {
      success: true,
      message: "Horários criados com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao cadastrar horários:", error);
    return {
      success: false,
      message: "Erro ao cadastrar horários",
      details: error.message,
    };
  }
};

const getAppointments = async () => {
  try {
    const [appointments] = await promisePool.query(
      `
        SELECT 
            h.*, 
            u1.nome AS paciente, 
            u2.nome AS psicologo,
            a.data AS dia
        FROM 
            horario h
            INNER JOIN usuario u1 ON h.idUser = u1.idUser
            INNER JOIN usuario u2 ON h.idPsico = u2.idUser
            INNER JOIN agenda a ON h.idAgenda = a.idAgenda 
        WHERE
            h.status IN ('Agendada', 'Cancelada', 'Remarcada', 'Realizada');
        `
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

const getAppointmentsById = async (recordId) => {
  try {
    const [appointments] = await promisePool.query(
      `
        SELECT 
            h.*, 
            u1.nome AS paciente, 
            u2.nome AS psicologo,
            a.data AS dia
        FROM 
            horario h
            INNER JOIN usuario u1 ON h.idUser = u1.idUser
            INNER JOIN usuario u2 ON h.idPsico = u2.idUser
            INNER JOIN agenda a ON h.idAgenda = a.idAgenda 
        WHERE
            h.idHorario = ?;
        `, [recordId]
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

const deleteAppointment = async (idHorario) => {
  try {
    const [result] = await promisePool.query(
      `UPDATE horario SET status = 'Cancelada' WHERE idHorario = ?`,
      [idHorario]
    );

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Consulta excluída com sucesso!",
      };
    } else {
      throw new Error("Falha ao excluir a consulta.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerAgenda,
  registerHours,
  getAppointments,
  getAppointmentsById,
  deleteAppointment
};
