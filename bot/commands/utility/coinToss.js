const source = require('rfr');
const { rand: Random } = require('true-random');

const { sendMessage } = source('bot/utils/util');

const generator = new Random();

function coinTossCommand(message) {
    const number = Math.trunc(generator.integer(0, 2));
    return sendMessage(message.channel, `:coin: ${number === 1 ? 'heads' : 'tails'}`);
}

module.exports = {
    args: false,
    name: 'toss-coin',
    botAdmin: false,
    description: 'flips a fair coin',
    usage: '',
    aliases: ['coin-flip'],
    execute: coinTossCommand,
};
