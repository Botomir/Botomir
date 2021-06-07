const source = require('rfr');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const Bot = source('bot');

function handleScheduleMessage(job) {
    const { serverID, channelID, message } = job.attrs.data;

    const guild = Bot.client.guilds.cache.get(serverID);

    if (!guild) {
        logger.error(`Server can not be found with id: ${serverID}`);
        return;
    }

    const channel = guild.channels.cache.get(channelID);
    if (!channel) {
        logger.error(`Channel can not be found in server ${serverID} with id: ${channelID}`);
        return;
    }

    sendMessage(channel, message);
}

module.exports = (agenda) => agenda.define('schedule message', handleScheduleMessage);
