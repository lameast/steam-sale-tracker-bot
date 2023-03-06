const {SlashCommandBuilder} = require("discord.js");
const {request} = require('undici'); 
const {Added, Game} = require('../models/models');
//TODO: Allow maximum of 25 games to be added per user. This is the limit for the number of fields in an embed.
//TODO: Check for free games.
//TODO: Redo logic for checking if game is already in database to reduce api calls to steam.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add a game to your list of tracked games.')
        .addStringOption(option =>
            option.setName('game')
                .setDescription('Name of game to be added (Must be exactly as it appears in Steam)')
                .setRequired(true)
        ),
    async execute(interaction){
        const game = interaction.options.getString('game');
        await interaction.deferReply();
        //http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json
        //https://store.steampowered.com/api/appdetails?appids={APP_ID}
        const appsResult = await request("http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json");
        const allApps = await appsResult.body.json();
        const apps = allApps.applist.apps;
        const app = apps.find(app => app.name == game);
        if (app == null){
            //Game not found
            await interaction.editReply(`${game} is not available on the Steam store.`)
        } else {
            //Game found
            const appResult = await request(`https://store.steampowered.com/api/appdetails?appids=${app.appid}`);
            const appDetails = await appResult.body.json();
            const priceOverview = appDetails[app.appid]['data']['price_overview'];
            const discountExists = true ? priceOverview["discount_percent"] > 0 : false;
            
            //Check if in database otherwise create
            const [newGame, created] = await Game.findOrCreate({
                where: {gameId: app.appid, name: app.name},
                defaults: {
                    discount: discountExists,
                    discountPrice: priceOverview['final_formatted']
                }
            });
           
            const added = await Added.create({
                user: interaction.user,
                gameId: app.appid
            })

            await interaction.editReply(`Added ${game} to your list!`)
        }
    }
};