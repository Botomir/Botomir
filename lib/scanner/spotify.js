// spotify.js
// ==========

const source = require('rfr');

const { spotifyTrackHandler, loadSettings } = source('lib/database/mongoDB');
const logger = source('lib/utils/logger');

// spotify track id's are base62 encoded 22 character string
const spotifyTrackRegex = /https:\/\/open.spotify.com\/track\/([0-9a-zA-Z]{22})/;

function spotifyTrackMessage(message) {
    const trackID = spotifyTrackRegex.exec(message.content)[1];

    loadSettings(message.guild.id)
        .then((config) => {
            if (message.channel.id === config.music_channel) {
                spotifyTrackHandler(message, `spotify:track:${trackID}`);
            }
        })
        .catch((err) => logger.log(`Failed to load settings: ${err}`));
}

module.exports = {
    spotifyTrackRegex,
    spotifyTrackMessage,
};
