const express = require('express');
const { addGlobalPlayer, getAllPlayers, getPlayerById, deletePlayerById } = require('../controllers/playerController'); // Asegúrate de importar deletePlayerById
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Añadir un nuevo jugador al sistema (solo administradores, por ejemplo)
router.post('/add', protect, addGlobalPlayer);

// Obtener todos los jugadores globales en el sistema
router.get('/', getAllPlayers);

// Obtener un jugador específico por ID
router.get('/:id', getPlayerById);

// Eliminar un jugador específico por ID
router.delete('/:id', protect, deletePlayerById); // Nueva ruta para eliminar un jugador

module.exports = router;
