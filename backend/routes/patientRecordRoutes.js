const express = require("express");
const router = express.Router();
const {
  createPatientRecord,
  getPatientRecordsHandler,
} = require("../controllers/patientRecordsController");

// Rotas para agendamento de consulta:
router.post("/create", createPatientRecord);
router.get("/get", getPatientRecordsHandler);

module.exports = router;
