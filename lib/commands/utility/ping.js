const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function pingCommand(message) {
    sendMessage(message.channel, 'Pong');
}

module.exports = {
    args: false,
    name: 'ping',
    botAdmin: false,
    description: 'checks if the bot is active',
    usage: '',
    aliases: [],
    execute: pingCommand,
    docs: '#### Ping\n\n'
        + '- Command: `ping`\n'
        + '- Returns: `Pong`\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !ping\n\n'
        + 'Botomir\n'
        + '> Pong\n'
        + '```',
};
