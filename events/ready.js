const {Events} = require('discord.js');

module.exportss = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};