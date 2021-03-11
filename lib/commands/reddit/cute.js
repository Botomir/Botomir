const source = require('rfr');
const _ = require('lodash');

const { redditPost } = source('lib/utils/reddit');

const logger = source('lib/utils/logger');

function cuteCommand(message, args, config) {
    return redditPost(message, _.sample(config.cuteSubs))
        .catch((err) => logger.error('error getting settings:', err));
}

module.exports = {
    args: false,
    name: 'cute',
    botAdmin: false,
    description: 'sends an image of a cute animal',
    usage: '',
    aliases: [],
    execute: cuteCommand,
    docs: '#### Cute\n\n'
        + '- Command: `cute`\n'
        + '- Returns: an embedded link to a post from a set of default subreddits\n'
        + '- How to configure:\n'
        + '  - `botomir-admin` role required to configure\n'
        + '  - `!add-cute-sub subreddit` will add a specified subreddit to the list of subreddits meme will randomly pull from\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !cute\n\n'
        + 'Botomir\n'
        + '> <embedded message with image of cute animal>\n'
        + '```',
};
