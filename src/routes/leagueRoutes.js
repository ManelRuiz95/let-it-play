const express = require('express');
const { createLeague, joinLeague, getUserLeagues, getAllLeagues, deleteLeague } = require('../controllers/leagueController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Crear una nueva liga
router.post('/create', protect, createLeague);

// Unirse a una liga existente
router.post('/join', protect, joinLeague);

// Obtener todas las ligas del usuario autenticado
router.get('/my-leagues', protect, getUserLeagues);

// Obtener todas las ligas (ruta nueva)
router.get('/', protect, getAllLeagues);

// Eliminar una liga
router.delete('/:leagueId', protect, deleteLeague);

module.exports = router;
