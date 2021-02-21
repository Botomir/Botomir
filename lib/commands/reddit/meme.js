// giveRole.js
// ===========

const source = require('rfr');
const _ = require('lodash');

const { redditPost } = source('lib/utils/reddit');
const { Settings } = source('lib/database/models/settings');

const logger = source('lib/utils/logger');

function memeCommand(message) {
    Settings.getServerSettings(message.guild.id)
        .then((config) => redditPost(message, _.sample(config.memeSubs)))
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
