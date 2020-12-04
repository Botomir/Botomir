// botMessage.js
// =============

const goodBotRegex = /(.*)([Gg][Oo][Oo][Dd](\s*)[Bb][Oo][Tt])(.*)/;
const badBotRegex = /(.*)([Bb][Aa][Dd](\s*)[Bb][Oo][Tt])(.*)/;

module.exports = {
    messageScanner: function (message) {
        if (goodBotRegex.test(message)) {
            goodBotMessage(message);
        } else if (badBotRegex.test(message)) {
            badBotMessage(message);
        }
    }
};

function goodBotMessage(message) {
    message.channel.send(":]")
        .then(r => "Successfully sent good bot text reaction - " + r)
        .catch(e => "Error: encountered error when sending good bot text reaction - " + e);
}

function badBotMessage(message) {
    message.channel.send("Grrr")
        .then(r => "Successfully sent bad bot text reaction - " + r)
        .catch(e => "Error: encountered error when sending bad bot text reaction - " + e);
}