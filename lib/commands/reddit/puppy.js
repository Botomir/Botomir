const source = require('rfr');

const { redditPost } = source('lib/utils/reddit');
const { Statistics, EventTypes } = source('lib/database/models/statistics');
const logger = source('lib/utils/logger');

function puppyCommand(message) {
    redditPost(message, 'puppy')
        .then(() => new Statistics()
            .setGuild(message.guild.id)
            .setEvent(EventTypes.PUPPYS_SHOWN)
            .save())
        .then(() => logger.info('statistics saved'));
}

module.exports = {
    args: false,
    name: 'puppy',
    botAdmin: false,
    description: 'puppy pic!',
    usage: '',
    aliases: [],
    execute: puppyCommand,
    docs: '#### Puppy\n\n'
        + '- Command: `puppy`\n'
        + '- Returns: an embedded link to a post from r/puppy\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !puppy\n'
        + '\n'
        + 'Botomir\n'
        + '> <embedded message with puppy image>\n'
        + '```\n',
};
