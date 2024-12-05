const promisePool = require("../config/databaseConfig");
const dayjs = require("dayjs");

const registerProntuario = async (prontuarioData) => {
  const { date, diagnosis, observations, patient } = prontuarioData;

  try {
    const formattedDate = dayjs(date, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const [existingPatient] = await promisePool.query(
      `SELECT * FROM usuario WHERE idUser = ?`,
      [patient]
    );

    if (existingPatient.length === 0) {
      console.error("Paciente não encontrado.");
      throw new Error("Paciente não encontrado.");
    }

    const [result] = await promisePool.query(
      `INSERT INTO prontuarios (date, diagnosis, observations, patient) VALUES (?, ?, ?, ?)`,
      [formattedDate, diagnosis, JSON.stringify(observations), patient]
    );

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Prontuário registrado com sucesso!",
        prontuarioId: result.insertId,
      };
    } else {
      throw new Error("Falha ao registrar o prontuário.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProntuarios = async () => {
  try {
    const [prontuarios] = await promisePool.query(
      `SELECT p.id, p.date, p.diagnosis, p.observations, p.patient, u.nome AS patient_name
            FROM prontuarios p
            JOIN usuario u ON p.patient = u.idUser`
    );

    return {
      success: true,
      prontuarios,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerProntuario,
  getProntuarios,
};
