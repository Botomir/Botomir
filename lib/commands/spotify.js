// spotify.js
// ==========

const {findTracksSince} = require("../database/mongoDB");
const {createPlaylist, addTracksToPlaylist, getAuthURL} = require("../spotify/spotifyApi");

const parse = require('parse-duration')

// This command should be called first before you can generate a playlist
// will send a message back with a link to authorize the bot
function authenticateSpotify(message) {

    let authUrl = getAuthURL(message.author.id);

    message.channel.send(`Please go to ${authUrl} to give this bot permissions to create a spotify playlist`)
        .then(r => console.log("Successfully created playlist"))
        .catch(e => console.log("Error: could not send message: ", e));
}

// find all the spotify tracks that have been added in the past time period
// and create a playlist using the users account. will send a link back to the created playlist
function generatePlaylistCommand(message) {

    let timeOffset = parse(message.content);

    timestamp = new Date();
    timestamp.setTime(timestamp.valueOf() - timeOffset);

    findTracksSince(timestamp).then(tracks => {

        if (tracks.length == 0) {
            m = "Can not create a playlist, no posts have been created since " + timestamp

            message.channel.send(m)
                .then(r => console.log("Successfully created playlist: " + r))
                .catch(e => console.log("Error: could not send message: " + e));
            return;
        }

        uris = [];
        uris = tracks.map(track => track.trackURI);

        createPlaylist(message.author.id)
            .then(playlistId => {
                return addTracksToPlaylist(message.author.id, playlistId, uris);
            })
            .then(playlistId => {
                stats = generateStats(tracks);
                stats += ` Playlist: https://open.spotify.com/playlist/${playlistId}`;

                return message.channel.send(stats);
            })
            .then(res => {
                console.log("Successfully created and added the tracks to the playlist");
            })
            .catch(err => {
                console.log("Error: Something went wrong, failed to create and add tracks to the playlist. " + err.stack);
                message.channel.send(err)
                    .then(sent => console.log("error message sent"))
                    .catch(err => console.log("failed to send error message"));
            });
    });
}

// this will generate some stats for the playlist
// how many songs, who added the most
function generateStats(tracks) {

    totalSongs = tracks.length;
    counts = new Map()

    tracks.forEach(track => {
        counts.set(track.author, (counts.get(track.author) | 0) + 1);
    });

    counts = Array.from(counts).sort((a, b) => b[1] - a[1]);

    return `There are ${totalSongs} songs on the playlist, ${counts[0][1]/totalSongs*100}% of them were added by ${counts[0][0]}`;
}

module.exports = {
    authenticateSpotify: authenticateSpotify,
    generatePlaylistCommand: generatePlaylistCommand,
};
