// src/controllers/leagueController.js
const League = require('../models/League');
const User = require('../models/User');

// Crear una nueva liga
const createLeague = async (req, res) => {
    const { name } = req.body;

    try {
        // Crear la liga y asignar el usuario creador como el propietario y miembro
        const league = new League({
            name,
            owner: req.user._id,
            users: [req.user._id],
        });

        const createdLeague = await league.save();

        // Actualizar el modelo de usuario para agregar la liga recién creada
        await User.findByIdAndUpdate(req.user._id, { $push: { leagues: createdLeague._id } });

        res.status(201).json(createdLeague);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Unirse a una liga existente
const joinLeague = async (req, res) => {
    const { leagueId } = req.body;

    try {
        const league = await League.findById(leagueId);

        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }

        if (league.users.includes(req.user._id)) {
            return res.status(400).json({ message: 'You are already in this league' });
        }

        league.users.push(req.user._id);
        await league.save();

        res.status(200).json(league);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todas las ligas del usuario autenticado
const getUserLeagues = async (req, res) => {
    try {
        const leagues = await League.find({ users: req.user._id });
        res.status(200).json(leagues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getAllLeagues = async (req, res) => {
    try {
        const leagues = await League.find()
            .populate('owner', 'username email') // Poblar el campo owner con información del usuario
            .populate('users', 'username email'); // Poblar el campo users con información de los usuarios
        res.status(200).json(leagues);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching leagues', error: err.message });
    }
};

// Eliminar una liga y desasignarla de todos los usuarios
const deleteLeague = async (req, res) => {
    const { leagueId } = req.params;

    try {
        const league = await League.findById(leagueId);

        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }

        // Desasignar la liga de todos los usuarios
        await User.updateMany(
            { leagues: leagueId },
            { $pull: { leagues: leagueId } }
        );

        // Eliminar la liga
        await league.remove();

        res.status(200).json({ message: 'League deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting league', error: err.message });
    }
};

module.exports = {
    createLeague,
    joinLeague,
    getUserLeagues,
    getAllLeagues,
    deleteLeague, // Añadimos la función al módulo de exportación
};
