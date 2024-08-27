// src/models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    league: {
        type: String,
        required: true,
    },
    competitionCountry: {
        type: String,
        required: true,
    },
    currentValue: {
        type: Number,
        required: true,
        default: function() {
            return this.basePrice; // El valor inicial es igual al precio base
        }
    },
}, {
    timestamps: true
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
