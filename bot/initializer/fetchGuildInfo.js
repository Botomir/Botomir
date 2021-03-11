const source = require('rfr');

const logger = source('bot/utils/logger');

function fetchGuildInfo(client, guildID) {
    client.guilds.fetch(guildID)
        .then((guild) => logger.info(`Connected to server: ${guild.name}, id: ${guild.id}\nMember Count: ${guild.memberCount}`))
        .catch((e) => logger.error('Error: encountered error when fetching guilds:', e));
}

exports.fetchGuildInfo = fetchGuildInfo;
