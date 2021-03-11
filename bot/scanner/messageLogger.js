const source = require('rfr');

const logger = source('bot/utils/logger');
const Message = source('models/message');

function databaseHandler(message) {
    const MessagePost = new Message.Message()
        .setGuild(message.guild.id)
        .setChannel(message.channel.id)
        .setMessage(message.id)
        .setAuthor(message.author.id)
        .setContent(message.content);
    return MessagePost.save()
        .then(() => logger.info('Successfully written message to database'))
        .catch((e) => logger.error('failed to save the message to the database', e));
}

module.exports = {
    databaseHandler,
};
