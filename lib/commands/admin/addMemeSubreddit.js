const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function addMemeSubCommand(message, args, config) {
    return config.addMemeSub(args[0])
        .save()
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
    docs: '#### Add meme subreddit\n\n'
        + '- Command: `!add-meme-sub <name of subreddit>`\n'
        + '- Returns: subreddit is added to list of meme subs and success or failure message is sent\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> add-meme-sub funny\n\n'
        + 'Botomir\n'
        + '> Settings updated.\n'
        + '```',
};
