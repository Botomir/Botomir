const source = require('rfr');
const _ = require('lodash');

const { redditPost } = source('lib/utils/reddit');
const { Settings } = source('lib/database/models/settings');
const { Statistics, EventTypes } = source('lib/database/models/statistics');

const logger = source('lib/utils/logger');

function memeCommand(message) {
    Settings.getServerSettings(message.guild.id)
        .then((config) => redditPost(message, _.sample(config.memeSubs)))
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
