require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const agendaCreation = require('./routes/agendaRoutes');

// Configura middleware do CORS:
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
}));

// Middleware de conversão JSON:
app.use(express.json());

// Chama as rotas de autenticação:
app.use('/', userRoutes);
app.use('/auth', userRoutes);
app.use('/user', userRoutes);
app.use('/appointment', appointmentRoutes);
app.post('/agenda/creation', (req, res) => {
    console.log('Bateu no servidor!');
    res.status(200).json({ message: 'Requisição POST recebida com sucesso!' });
});


// Inicializa servidor:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})