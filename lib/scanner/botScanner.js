const source = require('rfr');

const { goodBotRegex, badBotRegex, botMessage } = source('lib/scanner/botResponse');
const { spotifyTrackRegex, spotifyTrackMessage } = source('lib/scanner/spotify');

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
