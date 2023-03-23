const {SlashCommandBuilder} = require("discord.js");
const {Added, Game} = require('../models/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checksale')
        .setDescription('Check your list of tracked games that are on sale.'),
    async execute(interaction){
        await interaction.deferReply();
        const addedList = await Added.findAll({include: {
            model: Game,
            where: {
                discount: true
            }
        }
        }, {where: {
            user: interaction.user,
        }})
        //Use a helper function to create the embed
        //const embed = createEmbed(addedList, true)
        const onSaleGames = addedList.map(game => game.game.name);
        if (onSaleGames.length == 0){
            await interaction.editReply("There are no games on your list which are currently on sale.")
        } else {
    
            await interaction.editReply("The following game(s) in your list are on sale: \n" + onSaleGames.join("\n"));
        }
    }
};