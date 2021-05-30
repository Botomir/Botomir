const source = require('rfr');

const { sendMessage, getChannel, lookupRoleName } = source('bot/utils/util');
const { Role } = source('models/role');

const { parseRoleMessage } = source('bot/utils/roleParsing');
const logger = source('bot/utils/logger');

function generateMessageContent(header, mappings) {
    return mappings.reduce((acc, m) => `${acc}${m.emoji} : \`${m.label}\`\n`, `${header}\n\n`);
}

function reactToMessage(message, mappings) {
    return Promise.all(mappings.map((m) => message.react(m.emoji)));
}

function createRoleReaction(message, args, config) {
    const channelMention = args.shift().trim();
    const parts = parseRoleMessage(args.join(' '));

    const channel = getChannel(message.guild, channelMention);

    if (!channel) {
        return sendMessage(message.channel, `'${channelMention}' is not a channel, can not create a new role reaction message`);
    }

    // check that the roles actually exist
    const mappings = parts.mappings
        .map((m) => ({
            role: lookupRoleName(message.guild, m.roleName),
            ...m,
        }))
        .filter((m) => m.role && !config.unassignableRoles.includes(m.role.name));

    let watchMessage;

    return sendMessage(channel, generateMessageContent(parts.header, mappings))
        .then((mes) => {
            watchMessage = mes;
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
            sendMessage(message.channel, `Failed to update the reaction roles: ${e.message}`);
            logger.error('something went wrong saving the roles:', e);
        });
}

module.exports = {
    args: 3,
    name: 'create-role-reaction',
    botAdmin: true,
    description: 'create a message that can be use to automatically assign roles based on reactions',
    usage: '<#channel>\n<message>\n---\nemoji : role mapping',
    aliases: [],
    execute: createRoleReaction,
    docs: `#### Set role mappings for reaction assignment
- Command: \`!set-roles #channel\nintro\n---\n<mapping>\`
- Returns: Botomir will autogenerate a role assignment message to the specified channel
- Specifications
  - The role assignment can start with a message and be followed by \`---\` to specify role reactions
  - You can specify role reactions using the following format: \`<emoji> : <name of role>\`
  - To set a custom name for the role you can use the following format: \`<emoji> : <name of role> : <custom name>\`
  - Will filter out any roles that have been marked as unassignable on the server or that dont exist
  - The channel Must be specified
  - use the \`update-role-reaction\` command to edit the message
- Example usage:
\`\`\`
User
!create-role-reaction #general
This is a really cool message about automated role assignment
---
: fire: : role A : a super cool role
: waffle: : role B
\`\`\`

And will auto-generate the following message in #general:
\`\`\`
This is a really cool message about automated role assignment
:fire: a super cool role
:waffle: role B
\`\`\``,
};
