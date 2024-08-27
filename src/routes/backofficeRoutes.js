// src/routes/backofficeRoutes.js
const express = require('express');
const { getUsers, assignLeague, unassignLeague } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Rutas del backoffice protegidas
router.get('/users', protect, admin, getUsers);
router.post('/users/:userId/assign', protect, admin, assignLeague);
router.post('/users/:userId/unassign', protect, admin, unassignLeague);

module.exports = router;
