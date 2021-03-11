const source = require('rfr');
const { memeAsync: reddit } = require('memejs');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

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
    return reddit(subreddit)
        .then((data) => sendMessage(message.channel, {
            embed: createRedditEmbed(data.title, data.url),
        }))
        .catch((e) => {
            logger.error(`when calling memejs API on ${subreddit}:`, e);
            sendMessage(message.channel, `Failed to get an image or gif from r/${subreddit}`);
        });
}

module.exports = {
    redditPost,
};
