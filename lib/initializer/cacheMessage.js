// cacheMessage.js
// ===============

// This file is necessary because we want to cache scanner for our reaction handlers
// If we restart the bot, previous scanner may be removed from the cache, and the bot would not be aware if they receive a reaction
// This function allows us to add the message to our cache and register reactions in order to handle them
const source = require('rfr');

const logger = source('lib/utils/logger');

function cacheMessage(client, channelID, messageID) {
    client.channels.cache.get(channelID).messages.fetch(messageID)
        .then((message) => logger.log(`Cached message found: ${message}`))
        .catch((e) => logger.log(`Error: cached message not found: ${e}`));
}

exports.cacheMessage = cacheMessage;
