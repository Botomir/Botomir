// goodBot.js
// ==========

const _ = require('lodash');
const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const responseArr = [':]', 'I love you', 'This is my purpose', '<3', 'no u', {
    files: ['assets/cat_love.jpg'],
}];

const goodBotRegex = /[Gg][Oo][Oo][Dd]\s+[Bb][Oo][Tt]/;

function goodBotMessage(message) {
    sendMessage(message.channel, _.sample(responseArr));
}

module.exports = {
    goodBotRegex,
    goodBotMessage,
};
