const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

const random = require('random');

const uniformBoolean = random.uniformBoolean();

function coinTossCommand(message) {
    return sendMessage(message.channel, `:coin: ${uniformBoolean() ? 'heads' : 'tails'}`);
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
