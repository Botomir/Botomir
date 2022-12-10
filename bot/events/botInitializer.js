const source = require('rfr');

const { Events } = require('discord.js');

const logger = source('bot/utils/logger');
const { Settings } = source('models/settings');

function fetchGuildInfo(client, guildID) {
    client.guilds.fetch(guildID)
        .then((guild) => logger.info(`Connected to server: ${guild.name}, id: ${guild.id}\nMember Count: ${guild.memberCount}`))
        .catch((e) => logger.error('Error: encountered error when fetching guilds:', e));
}

function botInitializer(client) {
    logger.info('Bot is connected to Discord!');

    Settings.getAll()
        .then((configs) => configs.forEach((c) => fetchGuildInfo(client, c.guildID)))
        .catch((err) => logger.error(err));

    logger.info('Bot is now ready!');
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute: botInitializer,
};
