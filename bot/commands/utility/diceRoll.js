const source = require('rfr');
const { rand: Random } = require('true-random');

const { sendMessage } = source('bot/utils/util');

const generator = new Random();

const diceRegex = /^([0-9]*)d([0-9]{0,3})([+-][0-9]+)?$/;

function diceRoleCommand(message, args) {
    const dice = args.join('');

    const parts = diceRegex.exec(dice);

    let num = 1;
    let sides = 6;
    let modifier = 0;

    if (parts !== null) {
        num = Number.parseInt(parts[1], 10) || 1;
        sides = Number.parseInt(parts[2], 10) || 6;
        modifier = Number.parseInt(parts[3], 10) || 0;
    }
    const results = [];

    for (let i = 0; i <= num; i += 1) {
        results.push(Math.trunc(generator.integer(0, sides)) + 1);
    }

    const total = results.reduce((a, v) => a + v, modifier);

    return sendMessage(message.channel, `:game_die: (${results.join(', ')}) + ${modifier} = ${total}`);
}

module.exports = {
    args: false,
    name: 'roll',
    botAdmin: false,
    description: 'roles a 6 sided die, optionally can specify the number of sides',
    usage: '[<numSides>]',
    aliases: [],
    execute: diceRoleCommand,
    docs: `#### Roll dice
- Command: \`roll\`
- Returns: randomly generated number from 1 to 6, or 1 to N
- Example usage:
\`\`\`
User
> !roll

Botomir
> 🎲 1

User
> !roll 100

Botomir
> 🎲 48
\`\`\``,
};
