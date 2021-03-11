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
};
