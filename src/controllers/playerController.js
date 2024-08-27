const Player = require('../models/Player');
const { filterPlayers } = require('../services/playerFilterService');

// Añadir un nuevo jugador global al sistema
const addGlobalPlayer = async (req, res) => {
    const { name, position, team, basePrice, nationality, age, league, competitionCountry } = req.body;

    try {
        const player = new Player({
            name,
            position,
            team,
            basePrice,
            nationality,
            age,
            league,
            competitionCountry
        });

        const createdPlayer = await player.save();
        res.status(201).json(createdPlayer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los jugadores globales
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find({});
        
        const filteredPlayers = filterPlayers(players, req.query.searchTerm, req.query.filters || {});
        
        res.status(200).json(filteredPlayers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un jugador específico por su ID
const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Eliminar un jugador específico por su ID
const deletePlayerById = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting player', error: err.message });
    }
};

module.exports = { addGlobalPlayer, getAllPlayers, getPlayerById, deletePlayerById };
