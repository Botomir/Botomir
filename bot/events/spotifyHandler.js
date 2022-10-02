const source = require('rfr');

const logger = source('bot/utils/logger');

const { Settings } = source('models/settings');
const { Song } = source('models/song');

// spotify track id's are base62 encoded 22 character string
const spotifyTrackRegex = /https:\/\/open.spotify.com\/track\/([0-9a-zA-Z]{22})/;

// this will pull all the information out of the message field exepct the track.
// the track uri MUST be gotten before this is called (Note this is not the track url)
function spotifyTrackHandler(message, trackURI) {
    const track = new Song()
        .setGuild(message.guild.id)
        .setChannel(message.channel.id)
        .setMessage(message.id)
        .setAuthor(message.author.id)
        .setTrack(trackURI);

    return track.save()
        .then((r) => logger.info('Successfully written spotify song to database:', r))
        .catch((e) => logger.error('failed to record spotify track', e));
}

function spotifyTrackMessage(message) {
    if (message.guild === null || message.author.bot) return;
    const parts = spotifyTrackRegex.exec(message.content);

    if (!parts) return;
    const trackID = parts[1];

    Settings.getServerSettings(message.guild.id)
        .then((config) => {
            if (message.channel.id === config.musicChannelID) {
                spotifyTrackHandler(message, `spotify:track:${trackID}`);
            }
        })
        .catch((err) => logger.error('Failed to load settings:', err));
}

module.exports = {
    name: 'messageCreate',
    once: false,
    execute: spotifyTrackMessage,
};
