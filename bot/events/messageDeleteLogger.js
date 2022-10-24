const source = require('rfr');

const logger = source('bot/utils/logger');
const Message = source('models/message');

function deleteHandler(message) {
    if (message.guild === null || message.guild.id === '110373943822540800') return;

    Message.Message.find(message.guild.id, message.channel.id, message.id)
        .then((messageLog) => {
            if (messageLog) {
                return messageLog.delete().save();
            }
            return null;
        })
        .catch((e) => {
            logger.error('failed to save the message deletion to the database');
            logger.error(e);
        });
}

module.exports = {
    name: 'messageDelete',
    once: false,
    execute: deleteHandler,
};
