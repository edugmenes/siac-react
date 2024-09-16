require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userAuthRoute = require('./routes/userAuthRoute');

// Configura middleware do CORS:
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
}));

// Middleware de conversão JSON:
app.use(express.json());

// Chama as rotas de autenticação:
app.use('/auth', userAuthRoute);
app.use('', userAuthRoute)

// Inicializa servidor:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})