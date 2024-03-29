/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const mongoose = require('mongoose');
const source = require('rfr');

const schema = require('./schema');

const logger = source('bot/utils/logger');

const SpotifyAuth = mongoose.model('spotifyAuth', schema);

class Spotify {
    constructor() {
        this._model = new SpotifyAuth();
    }

    get _mongoId() {
        return this._model._id;
    }

    // this is the spotify user id not the discord user
    // this actually is the discord user, not the spotify user, (I am 99% sure of this)
    get user() {
        return this._model.user;
    }

    get accessToken() {
        return this._model.access_token;
    }

    get refreshToken() {
        return this._model.refresh_token;
    }

    get expiresAt() {
        return this._model.expires_at;
    }

    setUser(user) {
        if (typeof user === 'string') {
            this._model.user = user;
        }
        return this;
    }

    setAccessToken(token) {
        if (typeof token === 'string') {
            this._model.access_token = token;
        }
        return this;
    }

    setRefreshToken(token) {
        if (typeof token === 'string') {
            this._model.refresh_token = token;
        }
        return this;
    }

    setExpiry(expiry) {
        if (expiry instanceof Date) {
            this._model.expires_at = expiry;
        }
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static getLatestAuth(user) {
        return SpotifyAuth.where('user').equals(user).sort({
            expires_at: 'desc',
        }).limit(1)
            .then((res) => {
                if (res.length !== 1) throw new Error('Token not found, can not authenticate user.');

                const s = new Spotify();
                [s._model] = res;
                return s;
            });
    }

    static storeSpotifyAuth(user, access_token, refresh_token, expires_in) {
        const timestamp = new Date();
        timestamp.setTime(timestamp.valueOf() + expires_in * 1000);

        const auth = new Spotify()
            .setUser(user)
            .setAccessToken(access_token)
            .setRefreshToken(refresh_token)
            .setExpiry(timestamp);

        return auth.save().then((r) => {
            logger.info('Successfully written the spotify authentication tokens to database:', r);
            return r;
        });
    }
}

module.exports = {
    Spotify,
};
