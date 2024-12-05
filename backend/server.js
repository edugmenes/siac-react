const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const reportRoutes = require('./routes/reportRoutes');
const session = require('express-session');
const cookieParser = require('cookie-parser');


// Configura middleware do CORS:
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    credentials: true
}));

// Middleware de conversão JSON:
app.use(express.json());
app.use(cookieParser())

app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,  
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,           
            secure: false,            
            maxAge: 1000 * 60 * 60,   
        },
    })
);
// Chama as rotas de autenticação:
app.use('/', userRoutes);
app.use('/auth', userRoutes);
app.use('/user', userRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/agenda', agendaRoutes);
app.use('/report', reportRoutes);


// Inicializa servidor:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})