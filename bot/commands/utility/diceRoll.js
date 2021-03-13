const source = require('rfr');
const randomNumber = require('pure-random-number');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

function diceRoleCommand(message) {
    return randomNumber(1, 6)
        .then((number) => sendMessage(message.channel, `:game_die: ${number}`))
        .catch((err) => logger.error('error rolling a die:', err));
}

module.exports = {
    args: false,
    name: 'roll',
    botAdmin: false,
    description: 'roles a 6 sided die',
    usage: '',
    aliases: [],
    execute: diceRoleCommand,
};
