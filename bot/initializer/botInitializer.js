const source = require('rfr');

const { fetchGuildInfo } = source('bot/initializer/fetchGuildInfo');
const logger = source('bot/utils/logger');

const { Settings } = source('models/settings');

function botInitializer(client) {
    logger.info('Bot is connected to Discord!');

    Settings.getAll()
        .then((configs) => {
            configs.forEach((c) => fetchGuildInfo(client, c.guildID));
        })
        .catch((err) => logger.error(err));

    logger.info('Bot is now ready!');
}

exports.botInitializer = botInitializer;
