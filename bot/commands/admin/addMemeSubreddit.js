const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function addMemeSubCommand(message, args, config) {
    return config.addMemeSub(args[0]).save()
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
