// src/cron/updateTeams.js
const cron = require('node-cron');
const { getTeamsInLaLiga } = require('../services/teamService');

const updateTeamsCronJob = () => {
    // Programar el cron job para ejecutarse todos los días a las 3 AM
    cron.schedule('0 3 * * *', async () => {
        try {
            console.log('Updating LaLiga teams...');
            await getTeamsInLaLiga();
            console.log('LaLiga teams updated successfully.');
        } catch (error) {
            console.error('Error updating LaLiga teams:', error.message);
        }
    });

    // Ejecutar la actualización inmediatamente al iniciar el servidor
    getTeamsInLaLiga().then(() => {
        console.log('Initial update of LaLiga teams completed.');
    }).catch((error) => {
        console.error('Error during initial update of LaLiga teams:', error.message);
    });
};

module.exports = updateTeamsCronJob;
