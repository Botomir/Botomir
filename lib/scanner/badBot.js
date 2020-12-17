// badBot.js
// ==========

const _ = require('lodash');
const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const responseArr = ['Grrr', 'Fite me', '!ban', 'Ive got my eye on u', ':\'[', 'Y u do dis', 'no u'];
const badBotRegex = /[Bb][Aa][Dd]\s+[Bb][Oo][Tt]/;

function badBotMessage(message) {
    sendMessage(message.channel, _.sample(responseArr));
}

module.exports = {
    badBotRegex,
    badBotMessage,
};
