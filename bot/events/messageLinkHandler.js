const source = require('rfr');
const Discord = require('discord.js');

const { sendMessage, extractMessageLink } = source('bot/utils/util');
const logger = source('bot/utils/logger');

function messageLink(message) {
    if (message.guild === null) return;

    const { serverID, channelID, messageID } = extractMessageLink(message.content);

    if (!serverID) return;

    if (serverID !== message.guild.id) {
        logger.info('Will not render a message link for a different guild');
        return;
    }

    message.client.channels.cache.get(channelID).messages.fetch(messageID)
        .then((linkedMessage) => {
            const embededMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription(linkedMessage.content)
                .setAuthor({
                    name: `${linkedMessage.author.username} in #${linkedMessage.channel.name}`, iconURL: `https://cdn.discordapp.com/avatars/${linkedMessage.author.id}/${linkedMessage.author.avatar}`,
                });

            return sendMessage(message.channel, {
                embeds: [embededMessage],
            });
        })
        .catch((err) => logger.error('something went wrong with the embeded message', err));
}

module.exports = {
    name: 'messageCreate',
    once: false,
    execute: messageLink,
};
