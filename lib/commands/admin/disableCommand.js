const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function addMemeSubCommand(message, args) {
    const command = args[0].toLowerCase();

    if (command === 'enable-command' || command === 'disable-command') {
        return sendMessage(message.channel, `The command \`${command}\` can not be disabled.`);
    }

    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.disableCommand(command).save())
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err.message}`));
}

module.exports = {
    args: 1,
    name: 'disable-command',
    botAdmin: true,
    description: 'disables a command on this server',
    usage: '<command>',
    aliases: [],
    execute: addMemeSubCommand,
};
