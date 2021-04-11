const source = require('rfr');

const { sendMessage } = source('bot/utils/util');
const { findRole } = source('bot/roles/roles');

const helpEmbeded = {
    color: 0x0099ff,
    thumbnail: {
        url: `${process.env.BASE_URL}/static/logo.jpg`,
    },
    timestamp: new Date(),
    footer: {
        text: `For any questions contact ${process.env.BOT_MODS || '@Colonel Pineapple#3164'}`,
    },
};

function sendChunks(channel, fields, categoryName) {
    let partNum = 0;
    const numParts = Math.ceil(fields.length / 25);

    const category = categoryName || 'All';

    while (fields.length !== 0) {
        helpEmbeded.title = `${category} Botomir Commands (${partNum += 1}/${numParts})`;
        helpEmbeded.fields = fields.splice(0, 25);
        sendMessage(channel, {
            embed: helpEmbeded,
        });
    }
}

function helpGeneral(message, commands, config, category) {
    const isAdmin = findRole(message.member, config.botAdminRole);

    const fields = commands.filter((c) => !config.disabledCommands.includes(c.name))
        .filter((c) => !(c.botAdmin && !isAdmin))
        .map((command) => ({
            name: config.commandPrefix + command.name + (command.botAdmin ? ' - bot admin only' : ''),
            value: command.description,
        }));

    if (fields.length === 0) {
        sendMessage(message.channel, 'oh no! There are no commands here!!');
    } else {
        sendChunks(message.channel, fields, category);
    }
}

function helpSpecific(message, command, config) {
    // check if the command is disabled
    if (config.disabledCommands.includes(command.name)) {
        return sendMessage(message.channel, `${command.name} is not allowed on this server, `
            + 'contact one of the server admins if you think this is a mistake!');
    }

    // dont provide help if the user is not authorized for that command
    if (command.botAdmin && !findRole(message.member, config.botAdminRole)) {
        return sendMessage(message.channel, `You are not authorized to use the ${command.name} command`);
    }

    const fields = [
        {
            name: 'Name',
            value: command.name,
        }, {
            name: 'Category',
            value: command.category,
        }, {
            name: 'Bot Admin Only',
            value: command.botAdmin ? 'yes' : 'no',
        },
    ];

    if (command.aliases && command.aliases.length > 0) {
        fields.push({
            name: 'Aliases',
            value: command.aliases.join(', '),
        });
    }
    if (command.description) {
        fields.push({
            name: 'Description',
            value: command.description,
        });
    }
    if (command.usage) {
        fields.push({
            name: 'Usage',
            value: `${config.commandPrefix}${command.name} ${command.usage}`,
        });
    }

    helpEmbeded.fields = fields;
    return sendMessage(message.channel, {
        embed: helpEmbeded,
    });
}

function helpCommand(message, args, config) {
    const { commands, categories } = message.client;

    if (args.length === 0) {
        return helpGeneral(message, commands, config);
    }
    const name = args[0].toLowerCase();

    if (name === 'categories') {
        const categoryNames = categories.map((c) => `\`${c}\``).join(', ');
        return sendMessage(message.channel, `Valid categories to get help for are: ${categoryNames}`);
    }

    const command = commands.get(name)
        || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (command) return helpSpecific(message, command, config);

    const categoryCommands = commands.filter((c) => c.category === name);
    if (categoryCommands.size !== 0) return helpGeneral(message, categoryCommands, config, name);

    return sendMessage(message.channel, `${name} is not a valid command or cagtegory!`);
}

module.exports = {
    args: false,
    name: 'help',
    botAdmin: false,
    alwaysEnabled: true,
    description: 'lists all the commands, a category of commands or info about a specific command',
    usage: '[command or category name or ``]',
    aliases: ['commands'],
    execute: helpCommand,
    docs: `#### Help
- Command: \`help\`
- Args:
    - optional, \`<command>\`| \`<category>\` | \`categories\`
- Returns:
    - list of commands available to Botomir\n'
    - specific information about the passed in command if command specified\n'
- Example usage:
\`\`\`
User
'> !help

Botomir
> <embedded help message>
\`\`\`
\`\`\`
User
> !help ping

Botomir
> <embedded message with information about ping command>
\`\`\`
\`\`\`
User
> !help categories

Botomir
> Valid categories to get help for are: \`admin\`, \`information\`, \`music\`, \`reddit\`, \`roles\`, \`utility\`
\`\`\`
\`\`\`
User
> !help music

Botomir
> <embedded message with information about different music commands>
\`\`\``,
};
