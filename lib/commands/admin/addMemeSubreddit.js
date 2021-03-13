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
    docs: `#### Add meme subreddit
- Command: \`!add-meme-sub <name of subreddit>\`
- Returns: subreddit is added to list of meme subs and success or failure message is sent
- Example usage:
\`\`\`
User:
> add-meme-sub funny

Botomir
> Settings updated.
\`\`\``,
};
