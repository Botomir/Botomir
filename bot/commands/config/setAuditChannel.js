const source = require('rfr');

const { sendMessage, getChannel } = source('bot/utils/util');

function setAuditChannel(message, args, config) {
    const channel = getChannel(message.guild, args[0]);
    if (!channel) return sendMessage(message.channel, `${args[0]} is not a valid channel`);

    return config.setAuditChannel(channel.id)
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-audit-channel',
    botAdmin: true,
    description: 'set the channel where all message edits and deletions should get logged to',
    usage: '<channel>',
    aliases: [],
    execute: setAuditChannel,
    docs: `#### Set audit channel
- Command: \`!set-audit-channel\`
- Returns: audit channel Botomir will write to for is set and a success or failure message is sent
- Example usage:
\`\`\`
User:
> !set-audit-channel #audit

Botomir
> Settings updated.
\`\`\``,
};
