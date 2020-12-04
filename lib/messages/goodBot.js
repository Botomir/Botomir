// goodBot.js
// ==========

module.exports = {
    goodBotRegex: /(.*)([Gg][Oo][Oo][Dd](\s*)[Bb][Oo][Tt])(.*)/,

    goodBotMessage: function (message) {
        message.channel.send(":]")
            .then(r => "Successfully sent good bot text reaction - " + r)
            .catch(e => "Error: encountered error when sending good bot text reaction - " + e);
    }
};
