// botInitializer.js
// =================

const source = require('rfr');

const {fetchGuildInfo} = source('lib/initializer/fetchGuildInfo');
const {cacheMessage} = source('lib/initializer/cacheMessage');

function botInitializer(client) {
    console.log('Bot is connected to Discord!');

    fetchGuildInfo(client, process.env.DISCORD_GUILD_ID);
    cacheMessage(client, process.env.DISCORD_CHANNEL_ID, process.env.DISCORD_MESSAGE_ID);

    console.log('Bot is now ready!');
}

exports.botInitializer = botInitializer;
