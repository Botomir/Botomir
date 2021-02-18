// botInitializer.js
// =================

const source = require('rfr');

const { fetchGuildInfo } = source('lib/initializer/fetchGuildInfo');
const logger = source('lib/utils/logger');

const { Settings } = source('lib/database/models/settings');

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
