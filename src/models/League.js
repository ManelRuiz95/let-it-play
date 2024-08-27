// src/models/League.js
const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
}, {
    timestamps: true // Para añadir createdAt y updatedAt
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;
