// util.js
// =======

const source = require('rfr');

const logger = source('lib/utils/logger');

// this is asyncronous but will handle its own errors.
// it channel can be anything that implemnts .send(message).
function sendMessage(channel, message) {
    return channel.send(message)
        .then((r) => logger.info(`Successfully sent message: ${r}`))
        .catch((e) => logger.error(`could not send message: ${e}`));
}

module.exports = {
    sendMessage,
};
