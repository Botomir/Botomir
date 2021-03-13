const source = require('rfr');
const _ = require('lodash');

const { redditPost } = source('bot/utils/reddit');

const logger = source('bot/utils/logger');

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
    docs: `#### Cute
- Command: \`cute\`
- Returns: an embedded link to a post from a set of default subreddits
- How to configure:
  - \`botomir-admin\` role required to configure
  - \`!add-cute-sub subreddit\` will add a specified subreddit to the list of subreddits meme will randomly pull from
- Example usage:
\`\`\`
User
> !cute

Botomir
> <embedded message with image of cute animal>
\`\`\``,
};
