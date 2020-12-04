// badBot.js
// ==========

module.exports = {
    badBotRegex: /(.*)([Bb][Aa][Dd](\s*)[Bb][Oo][Tt])(.*)/,

    badBotMessage: function (message) {
        message.channel.send("Grrr")
            .then(r => "Successfully sent bad bot text reaction - " + r)
            .catch(e => "Error: encountered error when sending bad bot text reaction - " + e);
    }
};