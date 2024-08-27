// src/controllers/userController.js
const User = require('../models/User');
const League = require('../models/League');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('leagues', 'name');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Asignar un usuario a una liga
const assignLeague = async (req, res) => {
    const { userId } = req.params;
    const { leagueId } = req.body;

    try {
        const user = await User.findById(userId);
        const league = await League.findById(leagueId);
        if (!user || !league) {
            return res.status(404).json({ message: 'User or league not found' });
        }

        // Verificar si el usuario ya está asignado a esta liga
        if (!user.leagues.includes(league._id)) {
            user.leagues.push(league._id);
            await user.save();
        }

        // Verificar si la liga ya tiene asignado este usuario
        if (!league.users.includes(user._id)) {
            league.users.push(user._id);
            await league.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error assigning league' });
    }
};

// Desasignar un usuario de una liga
const unassignLeague = async (req, res) => {
    const { userId } = req.params;
    const { leagueId } = req.body;

    try {
        const user = await User.findById(userId);
        const league = await League.findById(leagueId);
        if (!user || !league) {
            return res.status(404).json({ message: 'User or league not found' });
        }

        // Eliminar la liga del array de ligas del usuario
        user.leagues = user.leagues.filter(l => l.toString() !== league._id.toString());
        await user.save();

        // Eliminar el usuario del array de usuarios de la liga
        league.users = league.users.filter(u => u.toString() !== user._id.toString());
        await league.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error unassigning league' });
    }
};

// Crear un usuario admin
const createAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password, role: 'admin' });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ message: 'Error creating admin user', error: error.message });
    }
};


module.exports = {
    getUsers,
    assignLeague,
    unassignLeague,
    createAdmin,  // Añadir esta línea
};
