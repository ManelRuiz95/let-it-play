// src/server.js
const app = require('./app');
const updatePlayerValues = require('./cron/updatePlayerValues');
const updateTeamsCronJob = require('./cron/updateTeams');


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    //updatePlayerValues(); // Iniciar el cron job
    //updateTeamsCronJob();  // Inicia el cron job
});
