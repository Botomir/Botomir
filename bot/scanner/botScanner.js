const source = require('rfr');

const { goodBotRegex, badBotRegex, botMessage } = source('bot/scanner/botResponse');
const { spotifyTrackRegex, spotifyTrackMessage } = source('bot/scanner/spotify');

function scannerHandler(message) {
    if (goodBotRegex.test(message)) {
        botMessage(message, 'goodbot');
    } else if (badBotRegex.test(message)) {
        botMessage(message, 'badbot');
    } else if (spotifyTrackRegex.test(message)) {
        spotifyTrackMessage(message);
    }
}

exports.scannerHandler = scannerHandler;
