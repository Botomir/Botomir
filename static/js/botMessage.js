// botMessage.js
// =============

const goodBotRegex = /(.*)([Gg][Oo][Oo][Dd](\s*)[Bb][Oo][Tt])(.*)/;
const badBotRegex = /(.*)([Bb][Aa][Dd](\s*)[Bb][Oo][Tt])(.*)/;

module.exports = {
    messageScanner: function (message) {
        if (goodBotRegex.test(message)) {
            message.channel.send(":]");
        } else if (badBotRegex.test(message)) {
            message.channel.send("Grrr");
        }
    }
};
