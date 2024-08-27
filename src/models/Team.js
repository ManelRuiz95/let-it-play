// src/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String },
    tla: { type: String },
    crestUrl: { type: String },
    venue: { type: String },
}, {
    timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
