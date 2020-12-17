// goodBot.js
// ==========

let _ = require('lodash');

const responseArr = [':]', 'I love you', 'This is my purpose', '<3', 'no u', {files: ['assets/cat_love.jpg']}];

const goodBotRegex = /[Gg][Oo][Oo][Dd]\s+[Bb][Oo][Tt]/;

function goodBotMessage(message) {
    message.channel.send(_.sample(responseArr))
        .then(r => console.log('Successfully sent good bot text reaction: ' + r))
        .catch(e => console.log('Error: encountered error when sending good bot text reaction: ' + e));
}

module.exports = {
    goodBotRegex: goodBotRegex,
    goodBotMessage: goodBotMessage
};
