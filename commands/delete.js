const {SlashCommandBuilder} = require("discord.js");
const {Added, Game} = require('../models/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Remove a game from your tracked list of games.')
        .addStringOption(option =>
            option.setName('game')
                .setDescription('Name of game to be removed (Must be exactly as it appears in Steam)')
                .setRequired(true)
        ),
    async execute(interaction){
        await interaction.deferReply();
        console.log(interaction);
        const game = await Game.findOne({where: {name: interaction.options.getString('game')}})
        if (!game){
            interaction.editReply("You do not have that game added.");
        } else {
            const removedGame = await Added.destroy({where: {
                user: interaction.user,
                gameId: game.gameId
            }})
            //Use a helper function to create the embed
            //const embed = createEmbed(addedList, true)
            if (!removedGame) {
                interaction.editReply("You do not have that game added.");
            } else {
                interaction.editReply(`${game.name} has been removed from your list.`);
            }
        }
    }
};