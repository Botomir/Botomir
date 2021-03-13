const source = require('rfr');
const randomNumber = require('pure-random-number');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

function diceRoleCommand(message, args) {

    const sides = Number.parseInt(args[0], 10) || 6;

    if (sides <= 1) return sendMessage(message.channel, `Sorry I can't figure out how to role a ${sides} die.`);
    return randomNumber(1, sides)
        .then((number) => sendMessage(message.channel, `:game_die: ${number}`))
        .catch((err) => logger.error('error rolling a die:', err));
}

module.exports = {
    args: false,
    name: 'roll',
    botAdmin: false,
    description: 'roles a 6 sided die, optionally can specify the number of sides',
    usage: '[<numSides>]',
    aliases: [],
    execute: diceRoleCommand,
};
