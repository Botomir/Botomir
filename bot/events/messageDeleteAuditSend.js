const source = require('rfr');
const moment = require('moment');

const { sendMessage } = source('bot/utils/util');

const logger = source('bot/utils/logger');
const { Settings } = source('models/settings');
const { Message } = source('models/message');

function auditHandler(message, client) {
    if (message.guild === null) return;

    let channel;
    let username = 'unknown';
    let content = 'unknown';

    const guild = client.guilds.cache.get(message.guild.id);

    Message.find(message.guild.id, message.channel.id, message.id)
        .then((m) => {
            if (!m) return null;

            content = m.content;
            return guild.members.fetch(m.authorID);
        })
        .then((u) => {
            if (u) username = u.user.username;
            return Settings.getServerSettings(message.guild.id);
        })
        .then((config) => {
            if (!config || !config.auditChannel) {
                logger.info(`audit channel for guild ${message.guild.id} has not been configured`);
                return;
            }

            if (message.channel.id === config.auditChannel) return;

            channel = guild.channels.cache.get(config.auditChannel);
            if (!channel) {
                logger.error(`audit channel for guild ${message.guild.id} does not exist`);
                return;
            }

            const time = moment().format('MMMM Do YYYY, HH:mm:ssZ');
            sendMessage(channel, `**DELETED**\nauthor: ${username}\nChannel: <#${message.channel.id}>\nAt: ${time}\nContent: ${content}`);
        })
        .catch((e) => {
            logger.error('failed to send the delete message to the audit channel');
            logger.error(e);
        });
}

module.exports = {
    name: 'messageDelete',
    once: false,
    execute: auditHandler,
};
