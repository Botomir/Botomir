const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function addCuteSubCommand(message, args, config) {
    return config.addCuteSub(args[0]).save()
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
