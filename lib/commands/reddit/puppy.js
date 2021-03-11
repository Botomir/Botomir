const source = require('rfr');

const { redditPost } = source('lib/utils/reddit');
const { Statistics, EventTypes } = source('models/statistics');
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
};
