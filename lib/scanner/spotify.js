// spotify.js
// ==========

const {spotifyTrackHandler} = require("../database/mongoDB");
// spotify track id's are base62 encoded 22 character string
const spotifyTrackRegex = /https:\/\/open.spotify.com\/track\/([0-9a-zA-Z]{22})/;

function spotifyTrackMessage(message) {
    let trackID = spotifyTrackRegex.exec(message.content)[1];
    spotifyTrackHandler(message, "spotify:track:" + trackID);
}

module.exports = {
    spotifyTrackRegex: spotifyTrackRegex,
    spotifyTrackMessage: spotifyTrackMessage
};
