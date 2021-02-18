// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');
const { Role } = source('lib/database/models/role');

const { parseRoleMessage } = source('lib/utils/roleParsing');
const logger = source('lib/utils/logger');

// sets the message that contains all the roll reactions:
// the message must consist of a welcome scentence and then a set of `<emoji>: <roll name>\n`
// the role name MUST match an existing role on the server
function setRoleMessageCommand(message, args) {
    const messageLinkRegex = /^https:\/\/discord.com\/channels\/([0-9]*)\/([0-9]*)\/([0-9]*)$/;
    const parts = messageLinkRegex.exec(args[0]);

    if (parts === null || parts.length !== 4) {
        return sendMessage(message.channel, 'Error: must send a link to the message');
    }

    const serverID = message.guild.id;
    const channelID = parts[2];
    const messageID = parts[3];

    return Role.removeServerRoles(message.guild.id)
        .then(() => message.client.channels.cache.get(channelID).messages.fetch(messageID))
        .then((roleMessage) => {
            logger.log(`role message found: ${roleMessage}`);
            const roles = parseRoleMessage(roleMessage.content);

            const promises = roles.map((m) => m.setGuild(serverID).save());
            return Promise.all(promises);
        })
        .then(() => Settings.getServerSettings(message.guild.id))
        .then((config) => config.setRoleMessage(messageID).save())
        .catch((e) => logger.log(`Error: something went wrong saving the roles: ${e}`));
}

module.exports = {
    args: 1,
    name: 'set-roles',
    botAdmin: true,
    description: 'autogenerate role mappings',
    usage: '<message link>',
    aliases: [],
    execute: setRoleMessageCommand,
};
