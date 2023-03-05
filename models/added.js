const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('added', {
    user: Sequelize.INTEGER,
    game: Sequelize.INTEGER,
});