// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage, getChannel } = source('bot/utils/util');
const logger = source('bot/utils/logger');

function setRoleChannelCommand(message, args, config) {
    const channel = getChannel(message.guild, args[0]);

    if (channel === undefined) return sendMessage(message.channel, `${args[0]} is not a valid channel to post to`);

    logger.info('updating the server to send the reaction messages to channel:', channel);

    return config.setWelcomeChannel(channel.id)
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err}`));
}

module.exports = {
    args: 1,
    name: 'set-role-channel',
    botAdmin: true,
    description: 'sets the channel to post the role reaction messages into',
    usage: '<channel>',
    aliases: [],
    execute: setRoleChannelCommand,
    docs: `#### Set channel for role reactions
- Command: \`set-role-channel\`
- Args:
    - requires \`<channel tag>\` as only argument
- Returns: Role watch channel set and success or failure message is sen
- Example usage
\`\`\`
User
> !set-role-channel #welcome

Botomir
> Settings updated.
\`\`\``,
};
