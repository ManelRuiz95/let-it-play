// src/utils/footballDataApi.js
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
console.log('API Key:', process.env.FOOTBALL_DATA_API_KEY);

const footballDataApi = axios.create({
    baseURL: 'https://api.football-data.org/v4',
    headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY }
});

module.exports = footballDataApi;
