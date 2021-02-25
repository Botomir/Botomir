const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function enableCommand(message, args) {
    const commandName = args[0].toLowerCase();

    const { commands } = message.client;

    const command = commands.get(commandName)
                    || commands.find((c) => c.aliases && c.aliases.includes(commandName));

    if (!command) return sendMessage(message.channel, `The command \`${commandName}\` does not exist.`);

    if (command.alwaysEnabled) return sendMessage(message.channel, `The command \`${commandName}\` cannot be disabled.`);

    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.enableCommand(command.name).save())
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err.message}`));
}

module.exports = {
    args: 1,
    name: 'enable-command',
    botAdmin: true,
    alwaysEnabled: true,
    description: 'enables a command that has previously been disabled on this server',
    usage: '<command>',
    aliases: [],
    execute: enableCommand,
};
