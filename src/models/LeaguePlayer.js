// src/models/LeaguePlayer.js
const mongoose = require('mongoose');

const leaguePlayerSchema = new mongoose.Schema({
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required: true,
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,  // El jugador puede no tener propietario al principio
    },
    acquisitionPrice: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true
});

const LeaguePlayer = mongoose.model('LeaguePlayer', leaguePlayerSchema);

module.exports = LeaguePlayer;
