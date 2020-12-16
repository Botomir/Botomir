// spotify.js
// ==========

const source = require("rfr");
const parse = require('parse-duration');

const {findTracksSince} = source("lib/database/mongoDB");
const {createPlaylist, addTracksToPlaylist, getAuthURL} = source("lib/spotify/spotifyApi");
const {discardCommand} = source("lib/commands/commandUtilities");

// This command should be called first before you can generate a playlist
// will send a message back with a link to authorize the bot
function authenticateSpotify(message) {

    let authUrl = getAuthURL(message.author.id);
    sendMessaage(message.author, `Please go to ${authUrl} to give this bot permissions to create a Spotify playlist`);
}

// find all the spotify tracks that have been added in the past time period
// and create a playlist using the users account. will send a link back to the created playlist
function generatePlaylistCommand(message) {

    let timestring = discardCommand(message.content);
    let timeOffset = parse(!timestring ? '1 week' : timestring);
    let timestamp = new Date();
    timestamp.setTime(timestamp.valueOf() - timeOffset);

    console.log(timestamp);
    findTracks(message, timestamp);
}

function findTracks(message, timestamp) {
    findTracksSince(timestamp)
        .then(tracks => loadPlaylist(message.author.id, message.channel, tracks))
        .catch(err => console.log("Error: Something went wrong, failed to create and add tracks to the playlist. " + err.stack));
}

function loadPlaylist(user, channel, tracks) {

    console.log(tracks)
    if (tracks.length === 0) return sendMessaage(channel, "Can not create playlist with no tracks.");

    return createPlaylist(user)
        .then(playlistId => addTracksToPlaylist(user, playlistId, tracks.map(track => track.trackURI)))
        .then(playlistId => sendMessaage(channel, generateStats(tracks, playlistId)));
}

// This will generate some stats for the playlist including how many songs, who added the most
function generateStats(tracks, playlistId) {

    let totalSongs = tracks.length;
    let counts = generateContributions(tracks);

    return `There are ${totalSongs} songs on the playlist, ${counts[0][1] / totalSongs * 100}% \
            of them were added by ${counts[0][0]}\nPlaylist: https://open.spotify.com/playlist/${playlistId}`;
}

// return a sorted array of (author, num tracks) contribution pairs
function generateContributions(tracks) {
    let counts = new Map();

    tracks.forEach(track => {
        counts.set(track.author, (counts.get(track.author) | 0) + 1);
    });

    return Array.from(counts).sort((a, b) => b[1] - a[1]);
}

// this is asyncronous but will handle its own errors.
// it channel can be anything that implemnts .send(message).
function sendMessaage(channel, message) {
    channel.send(message)
        .then(r => console.log("Successfully sent message: ", + r))
        .catch(e => console.log("Error: could not send message: ", e));
}

module.exports = {
    authenticateSpotify: authenticateSpotify,
    generatePlaylistCommand: generatePlaylistCommand,
};
