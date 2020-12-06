// badBot.js
// ==========

let _ = require("lodash");

const responseArr = ["Grrr", "Fite me", "!ban", "Ive got my eye on u", ":\'[", "Y u do dis", "no u"];

module.exports = {
    badBotRegex: /(.*)([Bb][Aa][Dd](\s*)[Bb][Oo][Tt])(.*)/,

    badBotMessage: function (message) {
        message.channel.send(_.sample(responseArr))
            .then(r => console.log("Successfully sent bad bot text reaction: " + r))
            .catch(e => console.log("Error: encountered error when sending bad bot text reaction: " + e));
    }
};
