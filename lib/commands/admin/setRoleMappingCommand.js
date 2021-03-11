// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage, getChannel } = source('lib/utils/util');
const logger = source('lib/utils/logger');

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
    docs: '#### Set channel for role reactions\n\n'
        + '- Command: `set-role-channel`\n'
        + '- Args:\n'
        + '    - requires `<channel tag>` as only argument\n'
        + '- Returns: Role watch channel set and success or failure message is sent\n'
        + '- Example usage\n'
        + '```\n'
        + 'User\n'
        + '> !set-role-channel #welcome\n\n'
        + 'Botomir\n'
        + '> Settings updated.\n'
        + '```\n',
};
