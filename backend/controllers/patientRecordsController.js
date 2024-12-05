const jwt = require("jsonwebtoken");
const patientRecordsModel = require("../models/patientRecordsModel");

const createPatientRecord = async (request, response) => {
  const { body } = request;

  try {
    await patientRecordsModel.registerProntuario(body);
    return response
      .status(201)
      .json({ message: "Prontuario cadastrado com sucesso!" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro na criação de prontuario" });
  }
};

const getPatientRecordsHandler = async (request, response) => {
  try {
    const prontuarios = await patientRecordsModel.getProntuarios();

    return response.status(200).json({
      message: "Prontuários consultados com sucesso!",
      data: prontuarios,
    });
  } catch (error) {
    console.error("Erro ao consultar prontuários:", error.message);

    return response
      .status(500)
      .json({ message: "Erro ao consultar prontuários" });
  }
};

module.exports = {
  getPatientRecordsHandler,
  createPatientRecord,
};
