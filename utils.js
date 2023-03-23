const {Game} = require('./models/models');
const {request} = require('undici'); 
const updateGames = async () => {
    const games = await Game.findAll();
    for (const game of games){
        const appResult = await request(`https://store.steampowered.com/api/appdetails?appids=${game.gameId}`);
        const appDetails = await appResult.body.json();

        const priceOverview = appDetails[game.gameId]['data']['price_overview'];
        const discountExists = true ? priceOverview["discount_percent"] > 0 : false;

        await Game.update({discount: discountExists, discountPrice: priceOverview['final_formatted']},{
            where: {
                gameId: game.gameId
            }
        })
        console.log(`Updated ${game.name}!`);
        await delay(1000);
    }
};

module.exports = {updateGames};