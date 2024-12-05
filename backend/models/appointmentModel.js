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

const updateHourStatus = async (hourValues) => {
  console.log("Chegou na model: ", hourValues);
  const { idUser, disponibilidade, status, sala, idHorario } = hourValues;

  try {
    const [result] = await promisePool.query(
      `UPDATE horario SET idUser = ?, disponibilidade = ?, status = ?, sala = ? WHERE idHorario = ?`,
      [idUser, disponibilidade, status, sala, idHorario]
    );

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Horário atualizado com sucesso!",
      };
    } else {
      return {
        success: false,
        message: "Horário não encontrado para atualização.",
      };
    }
  } catch (error) {
    console.error("Erro ao atualizar horário:", error);
    return {
      success: false,
      message: "Erro ao atualizar horário",
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

const getAppointmentDatesAvailable = async () => {
  try {
    // Executando a consulta no banco de dados
    const [appointments] = await promisePool.query(
      `
        SELECT DISTINCT 
            a.data, a.idAgenda, h.idPsico, u.nome
        FROM 
            agenda a
        INNER JOIN 
            horario h 
        ON 
            a.idAgenda = h.idAgenda
        INNER JOIN 
            usuario u 
        ON 
            h.idPsico = u.idUser
        WHERE 
            h.disponibilidade = 0;
      `
    );

    if (!Array.isArray(appointments) || appointments.length === 0) {
      return { success: false, message: "Nenhuma consulta encontrada" };
    }

    return { success: true, data: appointments, message: "Consultas encontradas com sucesso" };
  } catch (error) {
    console.error("Erro ao buscar consultas: ", error);

    return {
      success: false,
      message: "Erro ao buscar consultas",
      details: error.message,
    };
  }
};

const getAgendaAvailableHours = async (idAgenda) => {
  try {
    // Executando a consulta no banco de dados
    const [hours] = await promisePool.query(
      `
        SELECT idHorario, hora 
        FROM horario 
        WHERE idAgenda = ?
        AND disponibilidade = 0; 
      `, [idAgenda]
    );

    if (!Array.isArray(hours) || hours.length === 0) {
      return { success: false, message: "Nenhum horário encontrado." };
    }

    return { success: true, data: hours, message: "Horários encontrados com sucesso." };
  } catch (error) {
    console.error("Erro ao buscar horários: ", error);

    return {
      success: false,
      message: "Erro ao buscar horários.",
      details: error.message,
    };
  }
};

const getAgendaAvailablePsicos = async (idAgendas) => {
  try {
    // Executando a consulta no banco de dados
    const [psicos] = await promisePool.query(
      `
        SELECT DISTINCT
            h.idAgenda, h.idPsico, u.nome
        FROM 
            horario h
        INNER JOIN 
            usuario u
        ON
            h.idPsico = u.idUser
        WHERE 
            h.idAgenda IN (?) 
      `, [idAgendas]
    );

    if (!Array.isArray(psicos) || psicos.length === 0) {
      return { success: false, message: "Nenhum profissional encontrado para as agendas fornecidas." };
    }

    return { success: true, data: psicos, message: "Profissionais encontrados com sucesso." };
  } catch (error) {
    console.error("Erro ao buscar profissionais: ", error);

    return {
      success: false,
      message: "Erro ao buscar profissionais.",
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
            h.status IN ('Agendada', 'Cancelada', 'Remarcada', 'Realizada')
            AND u1.deletedAt is NULL 
            AND u2.deletedAt is NULL ;
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
      `UPDATE horario SET disponibilidade = 0, status = 'Cancelada' WHERE idHorario = ?`,
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
  updateHourStatus,
  registerHours,
  getAppointments,
  getAppointmentsById,
  deleteAppointment,
  getAppointmentDatesAvailable,
  getAgendaAvailableHours,
  getAgendaAvailablePsicos
};
