const source = require('rfr');
const Discord = require('discord.js');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

const messageLinkRegex = /https:\/\/discord.com\/channels\/([0-9]*)\/([0-9]*)\/([0-9]*)/;

function messageLink(message) {
    const parts = messageLinkRegex.exec(message);
    if (parts === null || parts.length !== 4) return;

    const serverID = parts[1];
    const channelID = parts[2];
    const messageID = parts[3];

    if (serverID !== message.guild.id) {
        logger.info('Will not render a message link for a different guild');
        return;
    }

    message.client.channels.cache.get(channelID).messages.fetch(messageID)
        .then((linkedMessage) => {
            const embededMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription(linkedMessage.content)
                .setAuthor(`${linkedMessage.author.username} in #${linkedMessage.channel.name}`, `https://cdn.discordapp.com/avatars/${linkedMessage.author.id}/${linkedMessage.author.avatar}`);

            return sendMessage(message.channel, embededMessage);
        })
        .catch((err) => logger.error('something went wrong with the embeded message', err));
}

module.exports = {
    messageLink,
    messageLinkRegex,
};
