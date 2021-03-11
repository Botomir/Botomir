const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function disableCommand(message, args, config) {
    const commandName = args[0].toLowerCase();

    const { commands } = message.client;

    const command = commands.get(commandName)
        || commands.find((c) => c.aliases && c.aliases.includes(commandName));

    if (!command) return sendMessage(message.channel, `The command \`${commandName}\` does not exist.`);

    if (command.alwaysEnabled) return sendMessage(message.channel, `The command \`${commandName}\` cannot be disabled.`);

    return config.disableCommand(command.name)
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err.message}`));
}

module.exports = {
    args: 1,
    name: 'disable-command',
    botAdmin: true,
    alwaysEnabled: true,
    description: 'disables a command on this server',
    usage: '<command>',
    aliases: [],
    execute: disableCommand,
    docs: '#### Disable Command\n\n'
        + '- Command: `!disable-command <name of command>`\n'
        + '- Returns: command is disabled and success or failure message is sent\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !disable-command reddit\n\n'
        + 'Botomir\n'
        + '> Settings updated.\n'
        + '```',
};
