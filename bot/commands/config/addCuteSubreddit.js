const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function addCuteSubCommand(message, args, config) {
    return config.addCuteSub(args[0])
        .save()
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
    docs: `#### Add cute subreddit
- Command: \`!add-cute-sub <name of subreddit>\`
- Returns: subreddit is added to list of cute subs and success or failure message is sent
- Example usage:
  - \`!add-cute-sub aww\`
\`\`\`
User:
> !add-cute-sub aww

Botomir
> Settings updated.
\`\`\``,
};
