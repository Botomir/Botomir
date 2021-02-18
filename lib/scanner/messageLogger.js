const source = require('rfr');

const logger = source('lib/utils/logger');
const Message = source('lib/database/models/message');

function databaseHandler(message) {
    const MessagePost = new Message.Message()
        .setGuild(message.guild.id)
        .setChannel(message.channel.id)
        .setMessage(message.id)
        .setAuthor(message.author.id)
        .setContent(message.content);
    return MessagePost.save().then((r) => logger.info('Successfully written message to database'));
}

module.exports = {
    databaseHandler,
};
