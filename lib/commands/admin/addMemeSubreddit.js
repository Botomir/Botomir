const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function addMemeSubCommand(message, args) {
    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.addMemeSub(args[0]).save())
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'add-meme-sub',
    botAdmin: true,
    description: 'add subreddit to get memes from',
    usage: '<subreddit name>',
    aliases: [],
    execute: addMemeSubCommand,
};
