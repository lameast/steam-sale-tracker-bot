const {SlashCommandBuilder} = require("discord.js");
const {Added, Game} = require('../models/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Check your list of tracked games.'),
    async execute(interaction){
        await interaction.deferReply();
        const addedList = await Added.findAll({include: Game}, {where: {
            user: interaction.user
        }})
        //Use a helper function to create the embed
        //const embed = createEmbed(addedList, false)
        //console.log(JSON.stringify(addedList, null, 2), addedList.length);
        if (addedList.length == 0){
            await interaction.editReply("There are no games on your list.")
        } else {
            const addedGameList = addedList.map(game => game.game.name);
            await interaction.editReply(addedGameList.join(",") + " are on your list.");
        }
    }
};