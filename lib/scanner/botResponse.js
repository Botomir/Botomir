// goodBot.js
// ==========

const _ = require('lodash');
const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { loadBotResponses } = source('lib/database/mongoDB');
const logger = source('lib/utils/logger');

const goodBotRegex = /[Gg][Oo][Oo][Dd]\s+[Bb][Oo][Tt]/;
const badBotRegex = /[Bb][Aa][Dd]\s+[Bb][Oo][Tt]/;

function botMessage(message, botMode) {
    const defaultMessage = botMode === 'goodbot' ? ':]' : ':\'[';

    return loadBotResponses(message.guild.id, botMode)
        .then((res) => {
            const response = res.length !== 0 ? _.sample(res).message : defaultMessage;
            sendMessage(message.channel, response);
        })
        .catch((err) => logger.log(`Error getting message: ${err}`));
}

module.exports = {
    goodBotRegex,
    badBotRegex,
    botMessage,
};
