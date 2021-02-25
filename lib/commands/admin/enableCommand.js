const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function addMemeSubCommand(message, args) {
    const command = args[0].toLowerCase();

    if (command === 'enable-command' || command === 'disable-command') {
        return sendMessage(message.channel, `The command \`${command}\` can not be enabled.`);
    }

    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.enableCommand(command).save())
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err.message}`));
}

module.exports = {
    args: 1,
    name: 'enable-command',
    botAdmin: true,
    description: 'enables a command that has previously been disabled on this server',
    usage: '<command>',
    aliases: [],
    execute: addMemeSubCommand,
};
