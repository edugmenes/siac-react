const express = require('express');
const route = express.Router();
const { validacaoReport } = require('../controllers/reportController'); // Importação correta

route.get('/validacaoReport', validacaoReport); 

module.exports = route;


route.get('/getEstagiarioProfessor')
