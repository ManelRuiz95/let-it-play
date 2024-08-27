// src/services/playerService.js
const footballDataApi = require('../utils/footballDataApi');
const Player = require('../models/Player');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getPlayersForTeam = async (teamId, teamName, league, competitionCountry) => {
    try {
        const response = await footballDataApi.get(`/teams/${teamId}`);
        const players = response.data.squad;

        for (const playerData of players) {
            let player = await Player.findOne({ name: playerData.name, team: teamName });
            if (!player) {
                const age = playerData.dateOfBirth
                    ? new Date().getFullYear() - new Date(playerData.dateOfBirth).getFullYear()
                    : null;

                player = new Player({
                    name: playerData.name,
                    position: playerData.position,
                    nationality: playerData.nationality,
                    age: age || 0,
                    team: teamName,
                    basePrice: 5000000,
                    league,
                    competitionCountry,
                    currentValue: 5000000,
                });
                await player.save();
                console.log(`Player ${player.name} added to Players.`);
            } else {
                console.log(`Player ${player.name} already exists.`);
            }
        }

        return players;
    } catch (error) {
        console.error(`Error fetching players for team ${teamName}:`, error.response ? error.response.data : error.message);
        throw new Error(`Error fetching players for team ${teamName} from Football Data API`);
    }
};

const getPlayersWithDelay = async (teams) => {
    for (const team of teams) {
        try {
            await getPlayersForTeam(team.id, team.name, 'LaLiga', 'Spain');
            await delay(10000);  // Espera 5 segundos antes de la siguiente solicitud
        } catch (error) {
            console.error(error.message);
            if (error.message.includes('429')) {
                console.log('Reached request limit, waiting 60 seconds...');
                await delay(60000);  // Espera 60 segundos si alcanzas el límite
            }
        }
    }
};

module.exports = { getPlayersForTeam, getPlayersWithDelay };
