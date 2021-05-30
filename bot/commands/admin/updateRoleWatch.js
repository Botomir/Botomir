const source = require('rfr');

const { sendMessage, lookupRoleName } = source('bot/utils/util');
const { Role } = source('models/role');

const { parseRoleMessage } = source('bot/utils/roleParsing');
const logger = source('bot/utils/logger');

const messageLinkRegex = /https:\/\/discord.com\/channels\/([0-9]*)\/([0-9]*)\/([0-9]*)/;

function generateMessageContent(header, mappings) {
    return mappings.reduce((acc, m) => `${acc}${m.emoji} : \`${m.label}\`\n`, `${header}\n\n`);
}

function reactToMessage(message, mappings) {
    return Promise.all(mappings.map((m) => message.react(m.emoji)));
}

function updateReactionMessage(message, args, config) {
    const messageLink = args.shift().trim();
    const parts = parseRoleMessage(args.join(' '));

    const linkParts = messageLinkRegex.exec(messageLink);
    if (linkParts === null || linkParts.length !== 4) {
        return sendMessage(message.channel, 'Must specify a link to one of the reaction messages to be able to update it.');
    }

    const serverID = linkParts[1];
    const channelID = linkParts[2];
    const messageID = linkParts[3];

    if (serverID !== message.guild.id) {
        return sendMessage(message.channel, 'Can not update a reaction message from a different server');
    }

    const channel = message.guild.channels.cache.get(channelID);
    if (!channel) {
        return sendMessage(message.channel, 'can not find channel from the message link, cant update the role reaction message');
    }

    // check that the roles actually exist
    const mappings = parts.mappings
        .map((m) => ({
            role: lookupRoleName(message.guild, m.roleName),
            ...m,
        }))
        .filter((m) => m.role && !config.unassignableRoles.includes(m.role.name));

    let watchMessage;
    return channel.messages.fetch(messageID)
        .then((m) => {
            watchMessage = m;
            return Role.isWatchMessage(serverID, channelID, messageID);
        })
        .then((status) => {
            if (!status) throw new Error('This message is not a role reaction message.');

            return watchMessage.edit(generateMessageContent(parts.header, mappings));
        })
        .then(() => Role.removeWatchedMessage(serverID, channelID, messageID))
        .then(() => {
            const promises = mappings.map((m) => new Role()
                .setEmoji(m.clean_emoji)
                .setRole(m.role.name)
                .setRoleID(m.role.id)
                .setGuild(watchMessage.guild.id)
                .setChannel(watchMessage.channel.id)
                .setMessage(watchMessage.id)
                .save());
            return Promise.all(promises);
        })
        .then(() => sendMessage(message.channel, 'Role reactions updated'))
        .then(() => reactToMessage(watchMessage, mappings))
        .catch((e) => {
            logger.error('something went wrong saving the roles:', e);
            sendMessage(message.channel, `Failed to update the reaction roles: ${e.message}`);
        });
}

module.exports = {
    args: 3,
    name: 'update-role-reaction',
    botAdmin: true,
    description: 'updates an existing a message that can be use to automatically assign roles based on reactions',
    usage: '<messageLink>\n<message>\n---\nemoji : role mapping',
    aliases: [],
    execute: updateReactionMessage,
    docs: `#### Set role mappings for reaction assignment
- Command: \`!update-role-reaction <messageLink>\nintro\n---\n<mapping>\`
- Returns: Botomir will autogenerate a role assignment message to the specified channel
- Specifications
  - The role assignment can start with a message and be followed by \`---\` to specify role reactions
  - You can specify role reactions using the following format: \`<emoji> : <name of role>\`
  - To set a custom name for the role you can use the following format: \`<emoji> : <name of role> : <custom name>\`
  - Will filter out any roles that have been marked as unassignable on the server or that dont exist
  - The message link must be a link to an existing role watch message
- Example usage:
\`\`\`
User
!update-role-reaction https://discord.com/channels/788091112476770353/840781330538168350/848597559614111764
This is a really cool message about automated role assignment
---
: fire: : role A : a super cool role
: waffle: : role B
\`\`\`

And will auto-generate and update the following message in #general:
\`\`\`
This is a really cool message about automated role assignment
:fire: a super cool role
:waffle: role B
\`\`\``,
};
