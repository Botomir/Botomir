const source = require('rfr');
const { memeAsync: reddit } = require('memejs');

const { sendMessage } = source('lib/utils/util');
const logger = source('lib/utils/logger');

function createRedditEmbed(title, url) {
    return {
        color: 0x0099ff,
        title,
        image: {
            url,
        },
    };
}

function redditPost(message, subreddit) {
    reddit(subreddit)
        .then((data) => sendMessage(message.channel, {
            embed: createRedditEmbed(data.title, data.url),
        }))
        .catch(() => logger.error(`when calling memejs API on ${subreddit}:`));
}

module.exports = {
    redditPost,
};
