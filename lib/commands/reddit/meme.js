const source = require('rfr');
const _ = require('lodash');

const { redditPost } = source('lib/utils/reddit');
const { Statistics, EventTypes } = source('lib/database/models/statistics');

const logger = source('lib/utils/logger');

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
    docs: '#### Meme\n\n'
        + '- Command: `meme`\n'
        + '- Returns: an embedded link to a post from a set of default subreddits\n'
        + '- How to configure:\n'
        + '  - `botomir-admin` role required to configure\n'
        + '  - `!add-meme-sub subreddit` will add a specified subreddit to the list of subreddits meme will randomly pull from\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !meme\n\n'
        + 'Botomir\n'
        + '> <embedded message with meme>\n'
        + '```\n',
};
