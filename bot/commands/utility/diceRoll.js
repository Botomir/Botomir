const source = require('rfr');

const random = require('random');

const { sendMessage } = source('bot/utils/util');

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

    const generator = random.uniformInt(1, sides);

    let total = modifier;
    let resultStr = '';
    for (let i = 0; i < num; i += 1) {
        const res = generator();
        total += res;

        resultStr = resultStr === '' ? res : `${resultStr}, ${res}`;
    }

    return sendMessage(message.channel, `:game_die: (${resultStr}) + ${modifier} = ${total}`);
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
