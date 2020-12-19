// redditPost.js
// =============

const _ = require('lodash');
const source = require('rfr');
const { memeAsync: reddit } = require('memejs');

const { memeSubreddits, cuteSubreddits } = source('config.json');
const { splitStringBySpace } = source('lib/commands/commandUtilities');
const { sendMessage } = source('lib/utils/util');
const logger = source('lib/utils/logger');

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

    messageArr.length < 2 ? sendNoSubredditSpecified(message) : redditPost(message, messageArr[1]);
}

function memeCommand(message) {
    redditPost(message, _.sample(memeSubreddits));
}

function puppyCommand(message) {
    redditPost(message, 'puppy');
}

function cuteCommand(message) {
    redditPost(message, _.sample(cuteSubreddits));
}

module.exports = {
    redditCommand,
    memeCommand,
    puppyCommand,
    cuteCommand,
};
