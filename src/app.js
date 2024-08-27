// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const leagueRoutes = require('./routes/leagueRoutes');
const playerRoutes = require('./routes/playerRoutes');
const leaguePlayerRoutes = require('./routes/leaguePlayerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const backofficeRoutes = require('./routes/backofficeRoutes'); // Importar las rutas del backoffice

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors()); // Para permitir solicitudes desde el frontend

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/league-players', leaguePlayerRoutes);
app.use('/api', teamRoutes);
app.use('/api/backoffice', backofficeRoutes); // Usar las rutas del backoffice

// Servir archivos estáticos de React
if (process.env.NODE_ENV === 'production') {
    // Si estamos en producción, servir los archivos de React
    app.use(express.static(path.join(__dirname, '../backoffice/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../backoffice', 'build', 'index.html'));
    });
} else {
    // Si estamos en desarrollo, indicar que la API está corriendo
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

module.exports = app;
