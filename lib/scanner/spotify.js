// spotify.js
// ==========

let _ = require("lodash");

const {spotifyTrackHandler} = require("../database/mongoDB");

// spotify track id's are base62 encoded 22 character string
const spotifyTrackRegex = /https:\/\/open.spotify.com\/track\/([0-9a-zA-Z]{22})/;

function spotifyTrackMessage(message) {

    // only track songs in a specified channel
    if (message.channel.id != process.env.DISCORD_MUSIC_CHANNEL_ID) {
        console.log("not logging spotify link as it is not in the specified channel");
        return;
    }

    trackID = spotifyTrackRegex.exec(message.content)[1];
    spotifyTrackHandler(message, "spotify:track:" + trackID);
}

module.exports = {
    spotifyTrackRegex: spotifyTrackRegex,
    spotifyTrackMessage: spotifyTrackMessage
};
