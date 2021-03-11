const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

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
};
