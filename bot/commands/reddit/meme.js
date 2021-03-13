const source = require('rfr');
const _ = require('lodash');

const { redditPost } = source('bot/utils/reddit');
const { Statistics, EventTypes } = source('models/statistics');

const logger = source('bot/utils/logger');

function memeCommand(message, args, config) {
    return redditPost(message, _.sample(config.memeSubs))
        .then(() => new Statistics()
            .setGuild(message.guild.id)
            .setEvent(EventTypes.MEMES_SENT)
            .save())
        .then(() => logger.info('statistics saved'))
        .catch((err) => logger.error('error getting settings:', err));
}

module.exports = {
    args: false,
    name: 'meme',
    botAdmin: false,
    description: 'sends a random meme',
    usage: '',
    aliases: [],
    execute: memeCommand,
    docs: `#### Meme
- Command: \`meme\`
- Returns: an embedded link to a post from a set of default subreddits
- How to configure:
  - \`botomir-admin\` role required to configure
  - \`!add-meme-sub subreddit\` will add a specified subreddit to the list of subreddits meme will randomly pull from
- Example usage:
\`\`\`
User
> !meme

Botomir
> <embedded message with meme>
\`\`\``,
};
