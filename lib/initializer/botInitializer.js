// botInitializer.js
// =================

const source = require('rfr');

const { fetchGuildInfo } = source('lib/initializer/fetchGuildInfo');
const { cacheMessage } = source('lib/initializer/cacheMessage');
const logger = source('lib/utils/logger');

function botInitializer(client) {
    logger.log('Bot is connected to Discord!');

    fetchGuildInfo(client, process.env.DISCORD_GUILD_ID);
    cacheMessage(client, process.env.DISCORD_CHANNEL_ID, process.env.DISCORD_MESSAGE_ID);

    logger.log('Bot is now ready!');
}

exports.botInitializer = botInitializer;
