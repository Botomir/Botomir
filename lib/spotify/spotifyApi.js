// spotifyApi.js
// ==========
const source = require('rfr');
const SpotifyWebApi = require('spotify-web-api-node');

const logger = source('lib/utils/logger');

const { Spotify } = source('lib/database/models/spotifyAuth');

const scopes = ['playlist-modify-public'];

const credentials = {
    redirectUri: `${process.env.BASE_URL}/authorize`,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    clientId: process.env.SPOTIFY_CLIENT_ID,
};

const spotifyApi = new SpotifyWebApi(credentials);

function parseAndSaveTokens(data, user) {
    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.access_token);
    spotifyApi.setRefreshToken(data.refresh_token);

    return Spotify.storeSpotifyAuth(user,
        data.access_token,
        data.refresh_token,
        data.expires_in);
}

// Convert the authorization code for an access token
function getSpotifyAuthToken(user, code) {
    // Retrieve an access token and a refresh token
    return spotifyApi.authorizationCodeGrant(code)
        .then((data) => parseAndSaveTokens(data.body, user))
        .catch((err) => {
            logger.log('Something went wrong, could not get auth token!', err);
            throw err;
        });
}

// Call this function when the access token expires and a new ones is needed
function refreshToken(user, token) {
    spotifyApi.setRefreshToken(token.refreshToken);

    return spotifyApi.refreshAccessToken()
        .then((data) => parseAndSaveTokens(data.body, user))
        .catch((err) => {
            logger.log('Could not refresh access token', err);
            throw err;
        });
}

// Call this function to check if a user is authenticated and refresh the auth token if necessary
function authenticateUser(user) {
    return Spotify.getLatestAuth(user)
        .then((token) => (token.expiresAt <= Date.now() ? refreshToken(user, token) : token))
        .then((token) => {
            spotifyApi.setAccessToken(token.accessToken);
            spotifyApi.setRefreshToken(token.refreshToken);
            return token;
        });
}

// This will get the url for the user to go to to authenticate the application
function getAuthURL(user) {
    return spotifyApi.createAuthorizeURL(scopes, user);
}

// Returns a promise with the playlist id on success
function createPlaylist(user, playlistPrefix, playlistDescription) {
    const playlistName = `${playlistPrefix} - ${new Date().toLocaleDateString()}`;
    return authenticateUser(user)
        .then(() => spotifyApi.createPlaylist(playlistName, {
            description: playlistDescription, public: true,
        }))
        .then((r) => {
            logger.log('playlist created successfully.');
            return r.body.id;
        });
}

// the playlist must already exist
function addTracksToPlaylist(user, playlistId, tracks) {
    return authenticateUser(user)
        .then((isAuthenticated) => {
            logger.log('Authentication successful: ', isAuthenticated);
            return spotifyApi.addTracksToPlaylist(playlistId, tracks);
        })
        .then((r) => {
            logger.log('Tracks added successfully: ', +r);
            return playlistId;
        });
}

module.exports = {
    addTracksToPlaylist,
    createPlaylist,
    getSpotifyAuthToken,
    getAuthURL,
};
