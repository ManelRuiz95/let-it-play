// src/services/teamService.js
const footballDataApi = require('../utils/footballDataApi');
const Team = require('../models/Team');
const { getPlayersWithDelay } = require('./playerService');

const getTeamsInLaLiga = async () => {
    try {
        const response = await footballDataApi.get('/competitions/PD/teams');
        const teams = response.data.teams;

        for (const teamData of teams) {
            let team = await Team.findOne({ name: teamData.name });
            if (!team) {
                team = new Team({
                    name: teamData.name,
                    shortName: teamData.shortName,
                    tla: teamData.tla,
                    crestUrl: teamData.crest,
                    venue: teamData.venue,
                });
                await team.save();
                console.log(`Team ${team.name} saved.`);
            } else {
                console.log(`Team ${team.name} already exists.`);
            }
        }

        // Obtener jugadores para cada equipo con un retraso y manejo de reintentos
        await getPlayersWithDelay(teams);

        return teams;
    } catch (error) {
        console.error('Error fetching teams:', error.response ? error.response.data : error.message);
        throw new Error('Error fetching teams from Football Data API');
    }
};

module.exports = { getTeamsInLaLiga };
