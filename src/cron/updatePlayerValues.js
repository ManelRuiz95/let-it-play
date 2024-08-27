// src/cron/updatePlayerValues.js
const cron = require('node-cron');
const Player = require('../models/Player');
const calculatePlayerValue = require('../utils/calculatePlayerValue');

const updatePlayerValues = async () => {
    try {
        const players = await Player.find({});
        players.forEach(async (player) => {
            // Asigna valores por defecto si faltan campos
            if (!player.nationality) player.nationality = 'Desconocido';
            if (!player.age) player.age = 0; // O cualquier valor por defecto apropiado
            if (!player.league) player.league = 'Desconocida';
            if (!player.competitionCountry) player.competitionCountry = 'Desconocido';

            player.currentValue = calculatePlayerValue(player);
            await player.save();
        });
        console.log('Player values updated');
    } catch (err) {
        console.error('Error updating player values:', err.message);
    }
};

// Programar la tarea para ejecutarse todos los días a medianoche
cron.schedule('0 0 * * *', updatePlayerValues);

module.exports = updatePlayerValues;
