// spotify.js
// ==========

const source = require("rfr");
const parse = require('parse-duration');

const {findTracksSince} = source("lib/database/mongoDB");
const {createPlaylist, addTracksToPlaylist, getAuthURL} = source("lib/spotify/spotifyApi");

// This command should be called first before you can generate a playlist
// will send a message back with a link to authorize the bot
function authenticateSpotify(message) {

    let authUrl = getAuthURL(message.author.id);

    message.channel.send(`Please go to ${authUrl} to give this bot permissions to create a Spotify playlist`)
        .then(r => console.log("Successfully created playlist: ", + r))
        .catch(e => console.log("Error: could not send message: ", e));
}

// find all the spotify tracks that have been added in the past time period
// and create a playlist using the users account. will send a link back to the created playlist
function generatePlaylistCommand(message) {

    let timeOffset = parse(message.content);

    let timestamp = new Date();
    timestamp.setTime(timestamp.valueOf() - timeOffset);

    findTracksSince(timestamp).then(tracks => {

        if (tracks.length === 0) {
            let m = "Can not create a playlist, no posts have been created since " + timestamp;

            message.channel.send(m)
                .then(r => console.log("Successfully created playlist: " + r))
                .catch(e => console.log("Error: could not send message: " + e));
            return;
        }

        let uris = [];
        uris = tracks.map(track => track.trackURI);

        createPlaylist(message.author.id)
            .then(playlistId => {
                return addTracksToPlaylist(message.author.id, playlistId, uris);
            })
            .then(playlistId => {
                let stats = generateStats(tracks);
                stats += ` Playlist: https://open.spotify.com/playlist/${playlistId}`;

                return message.channel.send(stats);
            })
            .then(res => {
                console.log("Successfully created and added the tracks to the playlist: ", + res);
            })
            .catch(err => {
                console.log("Error: Something went wrong, failed to create and add tracks to the playlist. " + err.stack);
                message.channel.send(err)
                    .then(sent => console.log("Error message sent: ", + sent))
                    .catch(e => console.log("Failed to send error message: ", e));
            });
    });
}

// This will generate some stats for the playlist including how many songs, who added the most
function generateStats(tracks) {

    let totalSongs = tracks.length;
    let counts = new Map();

    tracks.forEach(track => {
        counts.set(track.author, (counts.get(track.author) | 0) + 1);
    });

    counts = Array.from(counts).sort((a, b) => b[1] - a[1]);

    return `There are ${totalSongs} songs on the playlist, ${counts[0][1] / totalSongs * 100}% of them were added by ${counts[0][0]}`;
}

module.exports = {
    authenticateSpotify: authenticateSpotify,
    generatePlaylistCommand: generatePlaylistCommand,
};
