const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { findRole } = source('lib/roles/roles');

const helpEmbeded = {
    color: 0x0099ff,
    author: {
        name: 'Botomir Commands',
        icon_url: `${process.env.BASE_URL}/static/logo.jpg`,
    },
    timestamp: new Date(),
    footer: {
        text: 'For any questions contact @Colonel Pineapple#3164',
    },
};

function helpGeneral(message, commands, config) {
    const fields = commands.map((command) => {
        // check if the command should should be shown in the help list
        if (config.disabledCommands.includes(command.name)) return null;
        if (command.botAdmin && !findRole(message.member, config.botAdminRole)) return null;

        return {
            name: command.name + (command.botAdmin ? ' - bot admin only' : ''),
            value: command.description,
        };
    })
        .filter((f) => f !== null);

    helpEmbeded.fields = fields;
    return sendMessage(message.channel, {
        embed: helpEmbeded,
    });
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
    const { commands } = message.client;

    if (args.length === 0) {
        return helpGeneral(message, commands, config);
    }
    const name = args[0].toLowerCase();
    const command = commands.get(name)
        || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) return sendMessage(message.channel, `${name} is not a valid command!`);

    return helpSpecific(message, command, config);
}

module.exports = {
    args: false,
    name: 'help',
    botAdmin: false,
    alwaysEnabled: true,
    description: 'lists all the commands or info about a specific command',
    usage: '[command name]',
    aliases: ['commands'],
    execute: helpCommand,
    docs: '#### Help\n\n'
        + '- Command: `help`\n'
        + '- Args:\n'
        + '    - optional, `<command>`\n'
        + '- Returns: \n'
        + '    - list of commands available to Botomir\n'
        + '    - specific information about the passed in command if command specified\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !help\n\n'
        + 'Botomir\n'
        + '> <embedded help message>\n'
        + '```\n'
        + '```\n'
        + 'User\n'
        + '> !help ping\n\n'
        + 'Botomir\n'
        + '> <embedded message with information about ping command>\n'
        + '```',
};
