const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function addCuteSubCommand(message, args) {
    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.addCuteSub(args[0]).save())
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'add-cute-sub',
    botAdmin: true,
    description: 'add subreddit to get cute animal pictures from',
    usage: '<subreddit name>',
    aliases: [],
    execute: addCuteSubCommand,
};
