const Sequelize = require('sequelize');
const db = require('../db/db');

module.exports = db.define('game', {
    gameId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.TEXT,
    discount: Sequelize.BOOLEAN,
    discountPrice: Sequelize.TEXT,
}, {timestamp: false});