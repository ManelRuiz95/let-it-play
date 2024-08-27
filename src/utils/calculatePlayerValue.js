// src/utils/calculatePlayerValue.js
const calculatePlayerValue = (player) => {
    // Algoritmo de ejemplo: el valor aumenta diariamente en un 0.1% del precio base
    const today = new Date();
    const daysSinceStart = Math.floor((today - player.createdAt) / (1000 * 60 * 60 * 24));
    const increment = player.basePrice * 0.001 * daysSinceStart;
    return player.basePrice + increment;
};

module.exports = calculatePlayerValue;
