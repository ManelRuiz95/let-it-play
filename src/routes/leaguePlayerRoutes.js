// src/routes/leaguePlayerRoutes.js
const express = require('express');
const { addPlayerToLeague, getPlayersInLeague, auctionPlayer } = require('../controllers/leaguePlayerController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Añadir un jugador a una liga
router.post('/add', protect, addPlayerToLeague);

// Obtener todos los jugadores en una liga
router.get('/league/:leagueId', protect, getPlayersInLeague);

// Subastar un jugador en una liga
router.post('/auction', protect, auctionPlayer);

module.exports = router;
