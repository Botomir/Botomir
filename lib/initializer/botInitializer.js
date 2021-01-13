// botInitializer.js
// =================

const source = require('rfr');

const { fetchGuildInfo } = source('lib/initializer/fetchGuildInfo');
const { cacheMessage } = source('lib/initializer/cacheMessage');
const logger = source('lib/utils/logger');
const { getAllSettings } = source('lib/database/mongoDB');

const channelID = process.env.DISCORD_CHANNEL_ID;
const messageID = process.env.DISCORD_MESSAGE_ID;

function botInitializer(client) {
    logger.log('Bot is connected to Discord!');

    cacheMessage(client, channelID, messageID); // Delete later

    getAllSettings()
        .then((configs) => {
            configs.forEach((config) => {
                if (!config.role_watch_channel || !config.role_watch_message) return;

                fetchGuildInfo(client, config.guild);
                cacheMessage(client, config.role_watch_channel, config.role_watch_message);
            });
        })
        .catch((err) => logger.log(err));

    logger.log('Bot is now ready!');
}

exports.botInitializer = botInitializer;
