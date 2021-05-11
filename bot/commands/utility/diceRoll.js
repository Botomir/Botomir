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

    if (num > 100) {
        return sendMessage(message.channel, "That is too many dice to roll at once, please don't do more than 100 at a time");
    }

    const nums = generator.integers(1, sides+1, num);
    if (nums instanceof Array === false) {
        return sendMessage(message.channel, "Oh no something went wrong!!! I can't seem to find my dice");
    }

    const results = nums.map((n) => Math.trunc(n));
    const total = results.reduce((a, v) => a + v, modifier);

    return sendMessage(message.channel, `:game_die: (${results.join(', ')}) + ${modifier} = ${total}`);
}

module.exports = {
    args: false,
    name: 'roll',
    botAdmin: false,
    description: 'roles a 6 sided die, optionally can specify a number of sided dice for DND with a modifier',
    usage: '[<numDice>d<numSides> +- <optional modifier>]',
    aliases: [],
    execute: diceRoleCommand,
    docs: `#### Roll dice
- Command: \`roll\`
- Returns: Rolls some dice and adds an optional modifier to the result
- Example usage:
\`\`\`
User
> !roll

Botomir
> 🎲 (1) + 0 = 1

User
> !roll 1d20

Botomir
> 🎲 (11) + 0 = 11

User
> !roll 3d10 + 4

Botomir
> 🎲 (3, 5, 4) + 4 = 16
\`\`\``,
};
