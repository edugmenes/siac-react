const express = require('express');
const router = express.Router();
const {
    userLogin,
    getUsersByRole,
    userRegistration,
    //userAdressRegistration,
    getUsers,
    getUserById,
    userUpdate
} = require('../controllers/userController');

// Rota para função de login:
router.post('/login', userLogin);

router.get('/users', getUsers);
router.get('/users/:userId', getUserById)
router.post('/update/:userId', userUpdate)

// Rota para função de capturar usuários por id:
router.get('/roleId/:id', getUsersByRole);

// Rotas para funções de cadastro de usuário:
router.post('/register', userRegistration/*, userAdressRegistration*/);

module.exports = router;