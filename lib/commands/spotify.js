// spotify.js
// ==========

const source = require('rfr');
const parse = require('parse-duration');

const { createPlaylist, addTracksToPlaylist, getAuthURL } = source('lib/spotify/spotifyApi');
const { discardCommand } = source('lib/commands/commandUtilities');

const { sendMessage } = source('lib/utils/util');
const logger = source('lib/utils/logger');

const { Settings } = source('lib/database/models/settings');
const { Song } = source('lib/database/models/song');

// will send a message in a DM with a link to authorize the bot
function authenticateSpotify(message) {
    const authUrl = getAuthURL(message.author.id);
    sendMessage(message.author, `Please go to ${authUrl} to give this bot permissions to create a Spotify playlist`);
}

// return a sorted array of (author, num tracks) contribution pairs
function generateContributions(tracks) {
    const counts = new Map();

    tracks.forEach((track) => {
        counts.set(track.authorID, (counts.get(track.authorID) || 0) + 1);
    });

    return Array.from(counts).sort((a, b) => b[1] - a[1]);
}

// This will generate some stats for the playlist including how many songs, who added the most
function generateStats(tracks, playlistId) {
    const totalSongs = tracks.length;
    const counts = generateContributions(tracks);

    return `There are ${totalSongs} songs on the playlist, ${(counts[0][1] / totalSongs) * 100}% \
            of them were added by ${counts[0][0]}\nPlaylist: https://open.spotify.com/playlist/${playlistId}`;
}

function loadPlaylist(message, tracks) {
    const user = message.author.id;
    const { channel } = message;

    if (tracks.length === 0) return sendMessage(channel, 'Can not create playlist with no tracks.');

    return Settings.getServerSettings(message.guild.id)
        .then((config) => createPlaylist(user, config.playlistName, config.playlistDescription))
        .then((playlistId) => addTracksToPlaylist(user, playlistId, tracks.map((t) => t.trackURI)))
        .then((playlistId) => sendMessage(channel, generateStats(tracks, playlistId)));
}

function findTracks(message, timestamp) {
    Song.findSince(timestamp)
        .then((tracks) => loadPlaylist(message, tracks))
        .catch((err) => logger.log(`Error: Something went wrong, failed to create and add tracks to the playlist. ${err.stack}`));
}

// find all the spotify tracks that have been added in the past time period
// and create a playlist using the users account. will send a link back to the created playlist
function generatePlaylistCommand(message) {
    const timestring = discardCommand(message.content);
    const timeOffset = parse(!timestring ? '1 week' : timestring);
    const timestamp = new Date();
    timestamp.setTime(timestamp.valueOf() - timeOffset);

    findTracks(message, timestamp);
}

module.exports = {
    authenticateSpotify,
    generatePlaylistCommand,
};
