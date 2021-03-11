const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

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
    docs: '#### Add cute subreddit\n\n'
        + '- Command: `!add-cute-sub <name of subreddit>`\n'
        + '- Returns: subreddit is added to list of cute subs and success or failure message is sent\n'
        + '- Example usage:\n'
        + '  - `!add-cute-sub aww`\n'
        + '```\n'
        + 'User\n'
        + '> !add-cute-sub aww\n\n'
        + 'Botomir\n'
        + '> Settings updated.\n'
        + '```',
};
