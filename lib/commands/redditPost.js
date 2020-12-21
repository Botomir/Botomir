// redditPost.js
// =============

const _ = require('lodash');
const source = require('rfr');
const { memeAsync: reddit } = require('memejs');

const { splitStringBySpace } = source('lib/commands/commandUtilities');
const { sendMessage } = source('lib/utils/util');
const logger = source('lib/utils/logger');
const { loadSettings } = source('lib/database/mongoDB');


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
    loadSettings(message.guild.id)
        .then(config => redditPost(message, _.sample(config.meme_subreddits)))
        .catch(err => logger.log(`error getting settings: ${err}`));
}

function puppyCommand(message) {
    redditPost(message, 'puppy');
}

function cuteCommand(message) {
    loadSettings(message.guild.id)
        .then(config => redditPost(message, _.sample(config.cute_subreddits)))
        .catch(err => logger.log(`error getting settings: ${err}`));
}

module.exports = {
    redditCommand,
    memeCommand,
    puppyCommand,
    cuteCommand,
};
