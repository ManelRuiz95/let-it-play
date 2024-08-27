// src/controllers/leaguePlayerController.js
const LeaguePlayer = require('../models/LeaguePlayer');
const Player = require('../models/Player');
const League = require('../models/League');

// Añadir un jugador a una liga (antes de la subasta)
const addPlayerToLeague = async (req, res) => {
    const { playerId, leagueId } = req.body;

    try {
        const player = await Player.findById(playerId);
        const league = await League.findById(leagueId);

        if (!player || !league) {
            return res.status(404).json({ message: 'Player or League not found' });
        }

        const leaguePlayer = new LeaguePlayer({
            player: player._id,
            league: league._id,
            acquisitionPrice: player.basePrice,  // Inicialmente, el precio es el precio base
        });

        const createdLeaguePlayer = await leaguePlayer.save();
        res.status(201).json(createdLeaguePlayer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los jugadores en una liga
const getPlayersInLeague = async (req, res) => {
    try {
        const players = await LeaguePlayer.find({ league: req.params.leagueId }).populate('player');
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Subasta de un jugador en una liga
const auctionPlayer = async (req, res) => {
    const { leaguePlayerId, userId, acquisitionPrice } = req.body;

    try {
        const leaguePlayer = await LeaguePlayer.findById(leaguePlayerId);

        if (!leaguePlayer) {
            return res.status(404).json({ message: 'LeaguePlayer not found' });
        }

        if (leaguePlayer.owner) {
            return res.status(400).json({ message: 'Player already owned' });
        }

        leaguePlayer.owner = userId;
        leaguePlayer.acquisitionPrice = acquisitionPrice;

        await leaguePlayer.save();
        res.status(200).json(leaguePlayer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addPlayerToLeague, getPlayersInLeague, auctionPlayer };
