// botScanner.js
// =============

const {goodBotRegex, goodBotMessage} = require("./goodBot");
const {badBotRegex, badBotMessage} = require("./badBot");
const {spotifyTrackRegex, spotifyTrackMessage} = require("./spotify");

function scannerHandler(message) {
    if (goodBotRegex.test(message)) {
        goodBotMessage(message);
    } else if (badBotRegex.test(message)) {
        badBotMessage(message);
    } else if (spotifyTrackRegex.test(message) && message.channel.id === process.env.DISCORD_MUSIC_CHANNEL_ID) {
        spotifyTrackMessage(message)
    }
}

exports.scannerHandler = scannerHandler;
