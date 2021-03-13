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
    name: 'flip',
    botAdmin: false,
    description: 'flips a fair coin',
    usage: '',
    aliases: [],
    execute: coinTossCommand,
    docs: `#### Flip coin
- Command: \`toss-coin\`
- Returns: \`heads\` or \`tails\`
- Example usage:
\`\`\`
User
> !toss-coin

Botomir
> heads
\`\`\``,
};
