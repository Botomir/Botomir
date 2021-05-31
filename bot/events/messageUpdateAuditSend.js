const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

const logger = source('bot/utils/logger');
const { Settings } = source('models/settings');
const { Message } = source('models/message');

function auditHandler(oldM, newM) {
    let message;

    let oldContent = 'unknown';

    Promise.all([newM.partial ? newM.fetch() : newM])
        .then((res) => {
            [message] = res;

            if (message.guild === null || message.author.bot) {
                throw new Error('Can not send audit for DMs or for bot messages');
            }

            return Message.find(message.guild.id, message.channel.id, message.id);
        })
        .then((m) => {
            if (m) oldContent = m.content;
            return Settings.getServerSettings(message.guild.id);
        })
        .then((config) => {
            if (!config || !config.auditChannel) {
                throw new Error('No audit channel is specified for the guild');
            }

            const channel = message.guild.channels.cache.get(config.auditChannel);
            if (!channel) {
                logger.error(`audit channel for guild ${message.guild.id} does not exist`);
                return;
            }

            sendMessage(channel, `**UPDATED MESSAGE**\nauthor: ${message.author.username}\nChannel: <#${message.channel.id}>\nOld Content: ${oldContent}\nNew Content: ${message.content}`);
        })
        .catch((e) => {
            logger.error('failed to send the update message to the audit channel');
            logger.error(e);
        });
}

module.exports = {
    name: 'messageUpdate',
    once: false,
    execute: auditHandler,
};
