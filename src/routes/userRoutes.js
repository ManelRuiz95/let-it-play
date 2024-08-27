// src/routes/userRoutes.js
const express = require('express');
const { getUserProfile } = require('../controllers/authController');
const { getUsers, assignLeague, unassignLeague, createAdmin } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', protect, getUserProfile);

// Ruta para obtener todos los usuarios
router.get('/', protect, getUsers);

// Ruta para asignar un usuario a una liga
router.post('/:userId/assign', protect, assignLeague);

// Ruta para desasignar un usuario de una liga
router.post('/:userId/unassign', protect, unassignLeague);

// Ruta temporal para crear un usuario admin
router.post('/create-admin', createAdmin);

module.exports = router;
