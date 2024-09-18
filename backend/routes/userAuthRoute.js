const express = require('express');
const router = express.Router();
const { userLogin, getUsersByRole, userRegistration, userAdressRegistration } = require('../controllers/userAuthController');

// Rota para função de login:
router.post('/login', userLogin);

// Rota para função de capturar usuários por id:
router.get('/roleId/:id', getUsersByRole);

// Rotas para funções de cadastro de usuário:
router.post('/register', userRegistration);
router.post('/register', userRegistration);

module.exports = router;