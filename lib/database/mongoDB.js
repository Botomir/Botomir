// mongoDB.js
// ==========

const mongoose = require('mongoose');
const source = require('rfr');

const { memeSubreddits, cuteSubreddits } = source('config.json');

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

const DiscordSettings = mongoose.model('serverSettings', {
    guild: {
        type: String,
        index: true,
        unique: true,
    },
    role_watch_channel: String,
    role_watch_message: String,
    music_channel: String,
    command_prefix: {
        type: String,
        maxLength: 1,
        required: true,
        default: '!',
    },
    playlist_name: {
        type: String,
        required: true,
        default: 'Awesome Discord Group Playlist',
    },
    playlist_description: {
        type: String,
        required: true,
        default: 'A playlist that contains all the songs that the discord group posted in the last little while.',
    },
    tempature_unit: {
        type: String,
        uppercase: true,
        maxLength: 1,
        required: true,
        default: 'C',
    },
    weather_location: {
        type: String,
        required: true,
        default: 'Toronto, ON',
    },
    meme_subreddits: {
        type: [String],
        default: memeSubreddits,
    },
    cute_subreddits: {
        type: [String],
        default: cuteSubreddits,
    },
});

const RoleEmojis = mongoose.model('roleMappings', {
    guild: String,
    emoji_name: String,
    role_name: String,
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

    messagePost.save().then((r) => logger.log(`Successfully written message to database: ${r}`));
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

    track.save().then((r) => logger.log(`Successfully written spotify song to database: ${r}`));
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
        logger.log(`Successfully written the spotify authentication tokens to database: ${r}`);
        return r;
    });
}

function storeDefaultSettings(serverID) {
    const settings = new DiscordSettings({
        guild: serverID,
    });

    return settings.save().then((r) => {
        logger.log(`Successfully written the default server settings to database: ${r}`);
        return r;
    });
}

function loadSettings(serverID) {
    return DiscordSettings.findOne({
        guild: serverID,
    })
        .then((res) => {
            if (res !== null) return res;

            return storeDefaultSettings(serverID);
        });
}

function updateServerSettings(serverID, settings) {
    // figure out how to do this
    logger.log('TODO: UPDATE THE DB ENTRY');

    return DiscordSettings.findOneAndUpdate({
        guild: serverID,
    }, settings);
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

function saveRoleMapping(serverID, emoji, role) {
    const mapping = new RoleEmojis({
        guild: serverID,
        emoji_name: emoji,
        role_name: role,
    });

    return mapping.save().then((r) => {
        logger.log(`Successfully written the role mapping to database: ${r}`);
        return r;
    });
}

function lookupReaction(serverID, emoji) {
    return RoleEmojis.findOne({
        guild: serverID, emoji_name: emoji,
    });
}

function getAllSettings() {
    return DiscordSettings.find({
    });
}

module.exports = {
    databaseHandler,
    spotifyTrackHandler,
    findTracksSince,
    storeSpotifyAuth,
    getLatestAuth,
    loadSettings,
    storeDefaultSettings,
    updateServerSettings,
    saveRoleMapping,
    lookupReaction,
    getAllSettings,
};
