const express = require('express');
const router = express.Router();
const { userLogin, userRegistration, getUsersByRole } = require('../controllers/userAuthController');

router.get('/users/roleId/:id', getUsersByRole);
router.post('/login', userLogin);
router.post('/register', userRegistration);

module.exports = router;