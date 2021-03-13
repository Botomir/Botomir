const source = require('rfr');
const { rand: Random } = require('true-random');

const { sendMessage } = source('bot/utils/util');

const generator = new Random();

function diceRoleCommand(message, args) {
    const sides = Number.parseInt(args[0], 10) || 6;

    if (sides <= 1) return sendMessage(message.channel, `Sorry I can't figure out how to role a ${sides} die.`);

    const number = Math.trunc(generator.integer(0, sides)) + 1;
    return sendMessage(message.channel, `:game_die: ${number}`);
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
