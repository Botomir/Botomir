const source = require('rfr');
const randomNumber = require('pure-random-number');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

function coinTossCommand(message) {
    return randomNumber(1, 2)
        .then((number) => {
            sendMessage(message.channel, `:coin: ${number === 1 ? 'heads' : 'tails'}`);
        })
        .catch((err) => logger.error('error tossing the coin:', err));
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
