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
};
