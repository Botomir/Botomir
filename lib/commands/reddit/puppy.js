const source = require('rfr');

const { redditPost } = source('lib/utils/reddit');

function puppyCommand(message) {
    redditPost(message, 'puppy');
}

module.exports = {
    args: false,
    name: 'puppy',
    botAdmin: false,
    description: 'puppy pic!',
    usage: '',
    aliases: [],
    execute: puppyCommand,
};
