const source = require('rfr');

const logger = source('bot/utils/logger');

const discordIDRegex = /<[@#][&!]?([0-9]+)>/;

// this is asynchronous but will handle its own errors.
// it channel can be anything that implements .send(message).
function sendMessage(channel, message) {
    return channel.send(message)
        .then((m) => {
            logger.info(`Successfully sent message: '${m.cleanContent}'`);
            return m;
        })
        .catch((e) => logger.error(`could not send message:, ${e.message}`));
}

function sendReply(original, message) {
    return original.reply(message)
        .then((m) => {
            logger.info(`Successfully sent message: '${m.cleanContent}'`);
            return m;
        })
        .catch((e) => logger.error(`could not send message:, ${e.message}`));
}

function sendEventMessage(client, message) {
    const notificationGuildID = process.env.BOTOMIR_NOTIFICATION_GUILD;
    const notificationChannelID = process.env.BOTOMIR_NOTIFICATION_CHANNEL;

    if (!notificationGuildID || !notificationChannelID) {
        return logger.info('Bot notification channel is not configured');
    }

    return client.guilds.fetch(notificationGuildID)
        .then((guild) => guild.channels.cache.get(notificationChannelID))
        .then((channel) => sendMessage(channel, message))
        .catch((e) => logger.error('Error: encountered error when fetching guilds:', e));
}

function trimDiscordID(string) {
    if (!string) return undefined;

    const res = discordIDRegex.exec(string);
    return !res ? undefined : res[1];
}

function getMember(guild, user) {
    if (!guild || !user) return undefined;

    const str1Id = typeof user === 'string' ? trimDiscordID(user) : user.id;
    return guild.members.cache.get(str1Id);
}

function getChannel(guild, channel) {
    if (!guild || !channel) return undefined;

    const str1Id = typeof channel === 'string' ? trimDiscordID(channel) : channel.id;
    return guild.channels.cache.get(str1Id);
}

function getRole(guild, roleID) {
    if (!guild || !roleID) return undefined;

    return guild.roles.cache.get(roleID);
}

function lookupRoleName(guild, string) {
    return guild.roles.cache.find((role) => role.name === string);
}

const messageLinkRegex = /https:\/\/discord.com\/channels\/([0-9]+)\/([0-9]+)\/([0-9]+)/;

function extractMessageLink(messageLink) {
    const linkParts = messageLinkRegex.exec(messageLink);

    if (linkParts === null || linkParts.length !== 4) {
        return {
            serverID: null,
            channelID: null,
            messageID: null,
        };
    }

    return {
        serverID: linkParts[1],
        channelID: linkParts[2],
        messageID: linkParts[3],
    };
}

module.exports = {
    sendMessage,
    sendReply,
    getChannel,
    lookupRoleName,
    getMember,
    getRole,
    sendEventMessage,
    extractMessageLink,
};
