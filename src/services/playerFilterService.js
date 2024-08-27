// src/services/playerFilterService.js

const filterPlayers = (players, searchTerm, filters) => {
    let filtered = players;

    if (searchTerm) {
        filtered = filtered.filter(player =>
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (filters.team) {
        filtered = filtered.filter(player => player.team === filters.team);
    }

    if (filters.nationality) {
        filtered = filtered.filter(player => player.nationality === filters.nationality);
    }

    if (filters.league) {
        filtered = filtered.filter(player => player.league === filters.league);
    }

    if (filters.competitionCountry) {
        filtered = filtered.filter(player => player.competitionCountry === filters.competitionCountry);
    }

    return filtered;
};

module.exports = { filterPlayers };
