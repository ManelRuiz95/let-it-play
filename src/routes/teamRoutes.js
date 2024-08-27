// src/routes/teamRoutes.js
const express = require('express');
const { getTeamsInLaLiga } = require('../services/teamService');
const Team = require('../models/Team');
const router = express.Router();

// Ruta para obtener todos los equipos de LaLiga desde la base de datos
router.get('/teams/laliga', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para actualizar los equipos de LaLiga desde la API y guardarlos en la base de datos
router.post('/teams/laliga/update', async (req, res) => {
    try {
        const teams = await getTeamsInLaLiga();
        res.status(200).json({ message: 'Teams updated successfully', teams });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
