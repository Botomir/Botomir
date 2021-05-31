const source = require('rfr');
const { sendMessage } = require('../utils/util');

const logger = source('bot/utils/logger');
const { Settings } = source('models/settings');
const { Message } = source('models/message');

function auditHandler(message, client) {
    const guild = client.guilds.cache.get(message.guild.id);
    let messageObject;

    return Message.find(message.guild.id, message.channel.id, message.id)
        .then((m) => {
            messageObject = m;
            return Settings.getServerSettings(message.guild.id);
        })
        .then((config) => {
            if (!config.auditChannel) return;

            const channel = guild.channels.cache.get(config.auditChannel);
            if (!channel) {
                logger.error(`audit channel for guild ${message.guild.id} does not exist`);
                return;
            }

            sendMessage(channel, `**DELETED MESSAGE**\nauthor: <@${messageObject.authorID}>\nContent: ${messageObject.content}`);
        })
        .catch((e) => logger.error('failed to send the delete message to the audit channel', e));
}

module.exports = {
    name: 'messageDelete',
    once: false,
    execute: auditHandler,
};
