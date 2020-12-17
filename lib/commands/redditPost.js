// redditPost.js
// =============

let _ = require("lodash");
const source = require("rfr");
const {memeAsync: reddit} = require('memejs');

const {memeSubreddits, cuteSubreddits} = source("config.json");
const {splitStringBySpace} = source("lib/commands/commandUtilities");
const {sendMessage} = source("lib/utils/util");

function redditCommand(message) {
    let messageArr = splitStringBySpace(message.content);

    (messageArr.length < 2) ? sendNoSubredditSpecified(message) : redditPost(message, messageArr[1]);
}

function memeCommand(message) {
    redditPost(message, _.sample(memeSubreddits))
}

function puppyCommand(message) {
    redditPost(message, "puppy");
}

function cuteCommand(message) {
    redditPost(message, _.sample(cuteSubreddits));
}

function redditPost(message, subreddit) {

    reddit(subreddit)
        .then(data => sendMessage(message.channel, `${data.title}\n${data.url}`))
        .catch(err => console.log(`Error: when calling memejs API on ${subreddit}:`));
}


function sendNoSubredditSpecified(message) {
    sendMessage(message.channel, "Error: no subreddit specified");
}

module.exports = {
    redditCommand: redditCommand,
    memeCommand: memeCommand,
    puppyCommand: puppyCommand,
    cuteCommand: cuteCommand
};
