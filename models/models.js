const Added = require('./added');
const Game = require('./game');

Added.belongsTo(Game, {foreignKey: 'gameId'});
Game.hasMany(Added, {foreignKey: 'gameId'});

module.exports = {
    Added,
    Game
};