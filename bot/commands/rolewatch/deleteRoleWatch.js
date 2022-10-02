const source = require('rfr');

const { sendMessage, extractMessageLink } = source('bot/utils/util');
const { Role } = source('models/role');

const logger = source('bot/utils/logger');

function removeRoleWatch(message, args) {
    const messageLink = args[0].trim();

    const { serverID, channelID, messageID } = extractMessageLink(messageLink);

    if (!serverID) {
        return sendMessage(message.channel, 'Must specify a link to one of the reaction messages to be able to update it.');
    }

    if (serverID !== message.guild.id) {
        return sendMessage(message.channel, 'Can not update a reaction message from a different server');
    }

    const channel = message.guild.channels.cache.get(channelID);
    if (!channel) {
        return sendMessage(message.channel, 'can not find channel from the message link, cant update the role reaction message');
    }

    let watchMessage;
    return channel.messages.fetch(messageID)
        .then((m) => {
            watchMessage = m;
            return Role.isWatchMessage(serverID, channelID, messageID);
        })
        .then((status) => {
            if (!status) throw new Error('This message is not a role reaction message.');

            return Promise.all([
                watchMessage.delete(),
                Role.removeWatchedMessage(serverID, channelID, messageID),
            ]);
        })
        .then(() => sendMessage(message.channel, 'Role reaction message has been removed'))
        .catch((e) => {
            logger.error('something went wrong removing the role message:', e);
            sendMessage(message.channel, `Failed to remove the reaction roles message: ${e.message}`);
        });
}

module.exports = {
    args: 1,
    name: 'remove-role-reaction',
    botAdmin: true,
    description: 'stop watching for role reactions on a message and delete it',
    usage: '<messageLink>',
    aliases: [],
    execute: removeRoleWatch,
    docs: `#### Delete role mappings message
- Command: \`!remove-role-reaction <messageLink>\`
- Returns: stop watching the message for reactions and remove the message
- Specifications
  - The message link must be a link to an existing role watch message
- Example usage:
\`\`\`
User
!remove-role-reaction https://discord.com/channels/788091112476770353/840781330538168350/848597559614111764
\`\`\`

Will remove the existing message from #general that has the role reactions
`,
};
