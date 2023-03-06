const Sequelize = require('sequelize');
const db = require('../db/db');

module.exports = db.define('added', {
    user: Sequelize.INTEGER,
    gameId: Sequelize.INTEGER,
}, {timestamps: false});