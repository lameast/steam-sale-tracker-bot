const Added = require('./added');
const Game = require('./game');

Added.belongsTo(Game);
Game.hasMany(Added);

module.exports = {
    Added,
    Game
};