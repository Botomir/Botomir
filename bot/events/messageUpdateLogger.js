const source = require('rfr');

const logger = source('bot/utils/logger');
const Message = source('models/message');

function databaseHandler(oldM, newM) {
    let oldMessage;
    let newMessage;

    if (newM.guild === null || newM.author.bot) return;

    Promise.all([oldM.partial ? oldM.fetch() : oldM, newM.partial ? newM.fetch() : newM])
        .then((res) => {
            [oldMessage, newMessage] = res;
            return Message.Message.find(oldMessage.guild.id, oldMessage.channel.id, oldMessage.id);
        })
        .then((messageLog) => {
            if (messageLog) {
                messageLog.updateContent(newMessage.content, newMessage.editedTimestamp).save();
            }
        })
        .catch((e) => logger.error('failed to save the message update to the database', e));
}

module.exports = {
    name: 'messageUpdate',
    once: false,
    execute: databaseHandler,
};
