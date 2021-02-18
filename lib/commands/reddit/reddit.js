// giveRole.js
// ===========

const source = require('rfr');

const { redditPost } = source('lib/utils/reddit');

function redditCommand(message, args) {
    redditPost(message, args[0]);
}

module.exports = {
    args: 1,
    name: 'reddit',
    botAdmin: false,
    description: 'pulls post from specified subreddit',
    usage: 'subreddit',
    aliases: [],
    execute: redditCommand,
};
