const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('game', {
    id: Sequelize.INTEGER,
    name: Sequelize.TEXT,
    discount: Sequelize.BOOLEAN,
    discountPercent: Sequelize.INTEGER,
});