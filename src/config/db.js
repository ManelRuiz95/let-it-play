// src/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,         // Utiliza el nuevo analizador de URL
            useUnifiedTopology: true,      // Utiliza el nuevo motor de descubrimiento y monitoreo
            useCreateIndex: true           // Reemplaza ensureIndex con createIndexes
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
