const source = require('rfr');
const { Events } = require('discord.js');

const logger = source('bot/utils/logger');
const Message = source('models/message');

function databaseHandler(message) {
    if (message.guild === null || message.guild.id === '110373943822540800') return;

    const MessagePost = new Message.Message()
        .setGuild(message.guild.id)
        .setChannel(message.channel.id)
        .setMessage(message.id)
        .setAuthor(message.author.id)
        .setCreatedAt(message.createdTimestamp)
        .setContent(message.content, message.createdTimestamp);

    MessagePost.save()
        .then(() => logger.debug('Successfully written message to database'))
        .catch((e) => logger.error('failed to save the message to the database', e));
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: databaseHandler,
};
