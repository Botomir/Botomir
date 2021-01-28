// botInitializer.js
// =================

const source = require('rfr');

const { fetchGuildInfo } = source('lib/initializer/fetchGuildInfo');
const { cacheMessage } = source('lib/initializer/cacheMessage');
const logger = source('lib/utils/logger');
const { getAllSettings } = source('lib/database/mongoDB');

function botInitializer(client) {
    logger.log('Bot is connected to Discord!');

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
