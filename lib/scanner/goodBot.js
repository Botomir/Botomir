// goodBot.js
// ==========

let _ = require("lodash");

const responseArr = [":]", "I love you", "This is my purpose", "<3", "no u", {files: ["assets/cat_love.jpg"]}];

module.exports = {
    goodBotRegex: /(.*)([Gg][Oo][Oo][Dd](\s*)[Bb][Oo][Tt])(.*)/,

    goodBotMessage: function (message) {
        message.channel.send(_.sample(responseArr))
            .then(r => "Successfully sent good bot text reaction - " + r)
            .catch(e => "Error: encountered error when sending good bot text reaction - " + e);
    }
};
