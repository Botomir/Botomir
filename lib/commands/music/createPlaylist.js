const source = require('rfr');
const parse = require('parse-duration');

const { createPlaylist, addTracksToPlaylist } = source('lib/spotify/spotifyApi');

const { sendMessage } = source('lib/utils/util');
const { Song } = source('lib/database/models/song');
const { Settings } = source('lib/database/models/settings');

const logger = source('lib/utils/logger');

// return a sorted array of (author, num tracks) contribution pairs
function generateContributions(tracks) {
    const counts = new Map();

    tracks.forEach((track) => {
        counts.set(track.authorID, (counts.get(track.authorID) || 0) + 1);
    });

    return Array.from(counts).sort((a, b) => b[1] - a[1]);
}

// Create the message payload with playlist link and who added the most songs
function generateMessage(tracks, playlistId) {
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
        .then((playlistId) => sendMessage(channel, generateMessage(tracks, playlistId)));
}

function findTracks(message, timestamp) {
    Song.findSince(message.guild.id, timestamp)
        .then((tracks) => loadPlaylist(message, tracks))
        .catch((err) => logger.error('Something went wrong, failed to create and add tracks to the playlist.', err));
}

function generatePlaylistCommand(message, args) {
    const timeOffset = parse(args.join(' ')) || 604800000; // default of 1 week
    const timestamp = new Date();
    timestamp.setTime(timestamp.valueOf() - timeOffset);

    findTracks(message, timestamp);
}

module.exports = {
    args: false,
    name: 'createplaylist',
    botAdmin: false,
    description: 'create a Spotify playlist with the recent songs posted in the music channel, can optionally specify a time period',
    usage: '[time period]',
    aliases: [],
    execute: generatePlaylistCommand,
};
