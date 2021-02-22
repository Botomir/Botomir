// util.js
// =======

const source = require('rfr');

const logger = source('lib/utils/logger');

const discordIDRegex = /<[@#][&!]?([0-9]+)>/;

// this is asyncronous but will handle its own errors.
// it channel can be anything that implemnts .send(message).
function sendMessage(channel, message) {
    return channel.send(message)
        .then((m) => {
            logger.info('Successfully sent message:', m);
            return m;
        })
        .catch((e) => logger.error(`could not send message: ${e}`));
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

// Roles Discord Bot does not have access to
function filterRole(role) {
    if (!role || role.name === 'admin') {
        return null;
    }
    return role;
}

function lookupRoleName(guild, string) {
    return guild.roles.cache.find((role) => role.name === string);
}

module.exports = {
    sendMessage,
    lookupRoleName,
    filterRole,
    getMember,
};
