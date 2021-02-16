// redditPost.js
// =============

const _ = require('lodash');
const source = require('rfr');
const { memeAsync: reddit } = require('memejs');

const { splitStringBySpace } = source('lib/commands/commandUtilities');
const { sendMessage } = source('lib/utils/util');
const logger = source('lib/utils/logger');
const { Settings } = source('lib/database/models/settings');

function sendNoSubredditSpecified(message) {
    sendMessage(message.channel, 'Error: no subreddit specified');
}

function redditPost(message, subreddit) {
    reddit(subreddit)
        .then((data) => sendMessage(message.channel, `${data.title}\n${data.url}`))
        .catch(() => logger.log(`Error: when calling memejs API on ${subreddit}:`));
}

function redditCommand(message) {
    const messageArr = splitStringBySpace(message.content);

    if (messageArr.length < 2) {
        sendNoSubredditSpecified(message);
    } else {
        redditPost(message, messageArr[1]);
    }
}

function memeCommand(message) {
    Settings.getServerSettings(message.guild.id)
        .then((config) => redditPost(message, _.sample(config.memeSubs)))
        .catch((err) => logger.log(`error getting settings: ${err}`));
}

function puppyCommand(message) {
    redditPost(message, 'puppy');
}

function cuteCommand(message) {
    Settings.getServerSettings(message.guild.id)
        .then((config) => redditPost(message, _.sample(config.cuteSubs)))
        .catch((err) => logger.log(`error getting settings: ${err}`));
}

module.exports = {
    redditCommand,
    memeCommand,
    puppyCommand,
    cuteCommand,
};
