// botInitializer.js
// =================

const source = require('rfr');

const { fetchGuildInfo } = source('lib/initializer/fetchGuildInfo');
const logger = source('lib/utils/logger');
const { getAllSettings } = source('lib/database/mongoDB');

function botInitializer(client) {
    logger.log('Bot is connected to Discord!');

    getAllSettings()
        .then((configs) => {
            configs.forEach((c) => fetchGuildInfo(client, c.guild));
        })
        .catch((err) => logger.log(err));

    logger.log('Bot is now ready!');
}

exports.botInitializer = botInitializer;
