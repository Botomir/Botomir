const source = require('rfr');
const parse = require('parse-duration');

const { createPlaylist, addTracksToPlaylist } = source('bot/spotify/spotifyApi');

const { sendMessage } = source('bot/utils/util');
const { Song } = source('models/song');
const { Statistics, EventTypes } = source('models/statistics');

const logger = source('bot/utils/logger');

// return a sorted array of (author, num tracks) contribution pairs
function generateContributions(tracks) {
    const counts = new Map();

    tracks.forEach((track) => {
        counts.set(track.authorID, (counts.get(track.authorID) || 0) + 1);
    });

    return Array.from(counts)
        .sort((a, b) => b[1] - a[1]);
}

// Create the message payload with playlist link and who added the most songs
function generateMessage(tracks, playlistId) {
    const totalSongs = tracks.length;
    const counts = generateContributions(tracks);

    return `There are ${totalSongs} songs on the playlist, ${(counts[0][1] / totalSongs) * 100}% \
            of them were added by ${counts[0][0]}\nPlaylist: https://open.spotify.com/playlist/${playlistId}`;
}

function loadPlaylist(message, tracks, config) {
    const user = message.author.id;
    const { channel } = message;

    if (tracks.length === 0) return sendMessage(channel, 'Can not create playlist with no tracks.');

    return createPlaylist(user, config.playlistName, config.playlistDescription)
        .then((playlistId) => addTracksToPlaylist(user, playlistId, tracks.map((t) => t.trackURI)))
        .then((playlistId) => sendMessage(channel, generateMessage(tracks, playlistId)));
}

function findTracks(message, timestamp, config) {
    return Song.findSince(message.guild.id, timestamp)
        .then((tracks) => loadPlaylist(message, tracks, config))
        .catch((err) => logger.error('Something went wrong, failed to create and add tracks to the playlist.', err));
}

function generatePlaylistCommand(message, args, config) {
    const timeOffset = parse(args.join(' ')) || 604800000; // default of 1 week
    const timestamp = new Date();
    timestamp.setTime(timestamp.valueOf() - timeOffset);

    findTracks(message, timestamp, config)
        .then(() => new Statistics()
            .setGuild(message.guild.id)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .save())
        .then(() => logger.info('statistics saved'))
        .catch((err) => logger.error('error saving stats:', err));
}

module.exports = {
    args: false,
    name: 'createplaylist',
    botAdmin: false,
    description: 'create a Spotify playlist with the recent songs posted in the music channel, can optionally specify a time period',
    usage: '[time period]',
    aliases: [],
    execute: generatePlaylistCommand,
    docs: `#### Create playlist
- Command: \`!createplaylist\`
- Returns: creates a new playlist with recently posted songs in the music channel, can also specify time period
- Example usage:
\`\`\`
User
> !create-playlist
\`\`\``,
};
