// giveRole.js
// ===========

const source = require('rfr');
const _ = require('lodash');

const { redditPost } = source('lib/utils/reddit');
const { Settings } = source('lib/database/models/settings');

const logger = source('lib/utils/logger');

function cuteCommand(message) {
    Settings.getServerSettings(message.guild.id)
        .then((config) => redditPost(message, _.sample(config.cuteSubs)))
        .catch((err) => logger.log(`error getting settings: ${err}`));
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
