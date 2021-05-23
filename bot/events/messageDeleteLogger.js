const source = require('rfr');

const logger = source('bot/utils/logger');
const Message = source('models/message');

function databaseHandler(oldM) {
    let message;

    Promise.all([oldM.partial ? oldM.fetch() : oldM])
        .then((res) => {
            [message] = res;

            if (message.guild === null || message.author.bot) return null;
            return Message.Message.find(message.guild.id, message.channel.id, message.id);
        })
        .then((messageLog) => {
            if (messageLog) {
                messageLog.delete().save();
            }
        })
        .catch((e) => logger.error('failed to save the message deletion to the database', e));
}

module.exports = {
    name: 'messageDelete',
    once: false,
    execute: databaseHandler,
};
