const {Events} = require('discord.js');
const game = require('../models/game');
const {Added, Game} = require('../models/models');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        Added.sync({ force: true });
        Game.sync({ force: true });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};