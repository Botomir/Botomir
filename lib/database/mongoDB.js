// mongoDB.js
// ==========

const mongoose = require('mongoose');
const source = require('rfr');

const logger = source('lib/utils/logger');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
}).then((r) => logger.log(`Successfully connected to MongoDB: ${r}`))
    .catch((e) => logger.log(`Error starting up mongo: ${e}`));

const MessagePost = mongoose.model('messages', {
    guild: String,
    channel: String,
    author: String,
    content: String,
    timestamp: Date,
    id: String,
});

const SpotifyTrack = mongoose.model('songs', {
    guild: String,
    channel: String,
    author: String,
    trackURI: String,
    timestamp: Date,
    id: String,
});

const SpotifyAuthentication = mongoose.model('spotifyAuth', {
    user: String,
    access_token: String,
    refresh_token: String,
    expires_at: Date,
});

function databaseHandler(message) {
    const messagePost = new MessagePost({
        guild: message.guild,
        channel: message.channel,
        author: message.author,
        content: message.content,
        timestamp: message.createdAt,
        id: message.id,
    });

    messagePost.save().then((r) => logger.log(`Successfully written message to data base: ${r}`));
}

// this will pull all the information out of the message field exepct the track.
// the track uri MUST be gotten before this is called (Note this is not the track url)
function spotifyTrackHandler(message, trackURI) {
    const track = new SpotifyTrack({
        guild: message.guild,
        channel: message.channel,
        author: message.author,
        trackURI,
        timestamp: message.createdTimestamp,
        id: message.id,
    });

    track.save().then((r) => logger.log(`Successfully written spotify song to data base: ${r}`));
}

function findTracksSince(timestamp) {
    return SpotifyTrack.where('timestamp').gte(timestamp);
}

// stores the users authentication token information so it can be used in future requests
function storeSpotifyAuth(user, access_token, refresh_token, expires_in) {
    const timestamp = new Date();
    timestamp.setTime(timestamp.valueOf() + expires_in * 1000);

    const auth = new SpotifyAuthentication({
        user,
        access_token,
        refresh_token,
        expires_at: timestamp,
    });

    return auth.save().then((r) => {
        logger.log(`Successfully written the spotify authentication tokens to data base: ${r}`);
        return r;
    });
}

// get the latest authentication and refresh tokens for the user, null of there is not one.
function getLatestAuth(user) {
    return SpotifyAuthentication.where('user').equals(user).sort({
        expires_at: 'desc',
    }).limit(1)
        .then((res) => {
            if (res.length !== 1) throw new Error('Token not found, can not authenticate user.');
            return res[0];
        });
}

module.exports = {
    databaseHandler,
    spotifyTrackHandler,
    findTracksSince,
    storeSpotifyAuth,
    getLatestAuth,
};
