/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');
require('jest-extended');

const { Spotify } = source('models/spotifyAuth');

const fields = {
    guild: '788091112476770353',
    channel: '793573047550345237',
    user: '356984848574971914',
    message: '827754923844042802',
    content: 'this is an amazing bot',
};

describe('spotify authentication database', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('Create and save spotify authentication tokens', async () => {
        const d = new Date();
        const spotify = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        expect(spotify._mongoId).toBeDefined();
        const saved = await spotify.save();

        expect(saved._mongoId).toBeDefined();
        expect(saved.user).toBe(fields.user);
        expect(saved.accessToken).toBe('abcdeauthtoken');
        expect(saved.refreshToken).toBe('2345trefresh');
        expect(saved.expiresAt).toBe(d);
    });

    test('missing user', () => {
        const d = new Date();
        const spotify = new Spotify()
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - user name', () => {
        const d = new Date();
        const spotify = new Spotify()
            .setUser('botomir')
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - id to long', () => {
        const d = new Date();
        const spotify = new Spotify()
            .setUser('356984848574971914356984848574971914')
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - object', () => {
        const d = new Date();
        const spotify = new Spotify()
            .setUser({
                id: '1234',
            })
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('missing access token', () => {
        const d = new Date();
        const spotify = new Spotify()
            .setUser(fields.user)
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('missing refresh token', () => {
        const d = new Date();
        const spotify = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setExpiry(d);

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('missing expiry token', () => {
        const spotify = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh');

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('expiry wrong type', () => {
        const spotify = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(Date.now());

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('empty string access token', () => {
        const spotify = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('')
            .setExpiry(new Date());

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('empty string refresh token', () => {
        const spotify = new Spotify()
            .setUser(fields.user)
            .setAccessToken('')
            .setRefreshToken('2345trefresh')
            .setExpiry(new Date());

        return expect(spotify.save()).rejects.toThrow('validation failed');
    });

    test('get latest tokens for user - none', () => expect(Spotify.getLatestAuth(fields.user)).rejects.toThrow('not found'));

    test('get latest tokens for user - one', async () => {
        const d = new Date();
        const spotify = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        await spotify.save();

        const res = await Spotify.getLatestAuth(fields.user);
        expect(res._mongoId).toStrictEqual(spotify._mongoId);
    });

    test('get latest tokens for user - filter user', async () => {
        const d = new Date();
        const spotify1 = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        const spotify2 = new Spotify()
            .setUser('782053704227487754')
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        await spotify1.save();
        await spotify2.save();

        const res = await Spotify.getLatestAuth(fields.user);
        expect(res._mongoId).toStrictEqual(spotify1._mongoId);
    });

    test('get latest tokens for user - filter date', async () => {
        const d = new Date();
        const spotify1 = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d);

        await new Promise((r) => setTimeout(r, 500));
        const d2 = new Date();
        const spotify2 = new Spotify()
            .setUser(fields.user)
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d2);

        await new Promise((r) => setTimeout(r, 500));
        const d3 = new Date();
        const spotify3 = new Spotify()
            .setUser('782053704227487754')
            .setAccessToken('abcdeauthtoken')
            .setRefreshToken('2345trefresh')
            .setExpiry(d3);

        await spotify1.save();
        await spotify2.save();
        await spotify3.save();

        const res = await Spotify.getLatestAuth(fields.user);
        expect(res._mongoId).toStrictEqual(spotify2._mongoId);
    });

    test('store wrapper success', async () => {
        const timestamp = new Date();

        const res = await Spotify.storeSpotifyAuth(fields.user, 'abcdeauthtoken', '2345trefresh', 3600);

        const min = timestamp.valueOf() + 3599 * 1000;
        const max = timestamp.valueOf() + 3601 * 1000;

        expect(res).toBeInstanceOf(Spotify);
        expect(res._mongoId).toBeDefined();
        expect(res.user).toBe(fields.user);
        expect(res.accessToken).toBe('abcdeauthtoken');
        expect(res.refreshToken).toBe('2345trefresh');
        expect(res.expiresAt.valueOf()).toBeWithin(min, max);
    });

    test('store wrapper error', () => expect(Spotify.storeSpotifyAuth(fields.user, undefined, '2345trefresh', 3600)).rejects.toThrow('validation failed'));
});
