/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Song } = source('models/song');

const fields1 = {
    guild: '788091112476770353',
    channel: '793573047550345237',
    user: '356984848574971914',
    message: '827754923844042802',
    uri: 'spotify:track:3507Teuh1vj1L5eMAJj80O',
};

const fields2 = {
    guild: '698257589716123781',
    channel: '812553143958896640',
    user: '788093095543177216',
    message: '827754923336794142',
    uri: 'spotify:track:63isAEeUfFMWARkZ3I7G8k',
};

describe('Songs database', () => {
    beforeAll(() => mongoose.connect(process.env.MONGO_URL));

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('Create and save song', async () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        const savedSong = await song.save();

        expect(savedSong.timestamp).toBeDefined();
        expect(savedSong._mongoId).toBeDefined();
        expect(savedSong.guildID).toBe(fields1.guild);
        expect(savedSong.channelID).toBe(fields1.channel);
        expect(savedSong.authorID).toBe(fields1.user);
        expect(savedSong.messageID).toBe(fields1.message);
        expect(savedSong.trackURI).toBe(fields1.uri);
    });

    test('missing guild', () => {
        const song = new Song()
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('required');
    });

    test('missing channel', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('required');
    });

    test('missing message', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('required');
    });

    test('missing user', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('required');
    });

    test('missing track', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('required');
    });

    test('invalid guild - server name', () => {
        const song = new Song()
            .setGuild('bot testing server')
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - id too long', () => {
        const song = new Song()
            .setGuild('788091112476770353788091112476770353')
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - object', () => {
        const song = new Song()
            .setGuild({
                id: '1234',
            })
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - channel name', () => {
        const song = new Song()
            .setChannel('bot-testing')
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - id too long', () => {
        const song = new Song()
            .setChannel('788091112476770353788091112476770353')
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - object', () => {
        const song = new Song()
            .setChannel({
                id: '1234',
            })
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - user name', () => {
        const song = new Song()
            .setAuthor('botomir')
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setChannel(fields1.channel)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - id too long', () => {
        const song = new Song()
            .setAuthor('788091112476770353788091112476770353')
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setChannel(fields1.channel)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - object', () => {
        const song = new Song()
            .setAuthor({
                id: '1234',
            })
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setChannel(fields1.channel)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid message - message text', () => {
        const song = new Song()
            .setMessage('this is such a cool bot')
            .setGuild(fields1.guild)
            .setAuthor(fields1.user)
            .setChannel(fields1.channel)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid message - id too long', () => {
        const song = new Song()
            .setMessage('788091112476770353788091112476770353')
            .setGuild(fields1.guild)
            .setAuthor(fields1.user)
            .setChannel(fields1.channel)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid message - object', () => {
        const song = new Song()
            .setMessage({
                id: '1234',
            })
            .setGuild(fields1.guild)
            .setAuthor(fields1.user)
            .setChannel(fields1.channel)
            .setTrack(fields1.uri);

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid trackUri - wrong case', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack('Spotify:Track:63isAEeUfFMWARkZ3I7G8k');

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid trackUri - wrong type', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack('spotify:episode:63isAEeUfFMWARkZ3I7G8k');

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid trackUri - too long', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack('Spotify:track:63isAEeUfFMWARkZ3I7G8k2');

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('invalid trackUri - too short', () => {
        const song = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack('Spotify:track:63isAEeUfFMWARkZ3I7G8');

        expect(song._mongoId).toBeDefined();
        return expect(song.save()).rejects.toThrow('validation failed');
    });

    test('count none', async () => {
        const res = await Song.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 0);
        expect(res).toHaveProperty('database', 'Song');
    });

    test('count several', async () => {
        const song1 = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        const song2 = new Song()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setAuthor(fields2.user)
            .setTrack(fields2.uri);

        await song1.save();
        await song2.save();

        const res = await Song.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 2);
        expect(res).toHaveProperty('database', 'Song');
    });

    test('findSince none', () => expect(Song.findSince(fields1.guild, new Date())).resolves.toHaveLength(0));

    test('findSince none since', async () => {
        const song1 = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        const song2 = new Song()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setAuthor(fields2.user)
            .setTrack(fields2.uri);

        await song1.save();
        await song2.save();

        await new Promise((r) => setTimeout(r, 500));

        expect(Song.findSince(fields1.guild, new Date())).resolves.toHaveLength(0);
    });

    test('findSince filter since', async () => {
        const song1 = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        await song1.save();
        await new Promise((r) => setTimeout(r, 500));
        const timestamp = new Date();
        await new Promise((r) => setTimeout(r, 500));

        const song2 = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields2.message)
            .setAuthor(fields2.user)
            .setTrack(fields2.uri);

        await song2.save();

        await new Promise((r) => setTimeout(r, 500));

        const res = await Song.findSince(fields1.guild, timestamp);

        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Song);
        expect(res[0].timestamp).toBeDefined();
        expect(res[0]._mongoId).toStrictEqual(song2._mongoId);
        expect(res[0].guildID).toBe(fields1.guild);
        expect(res[0].channelID).toBe(fields1.channel);
        expect(res[0].authorID).toBe(fields2.user);
        expect(res[0].messageID).toBe(fields2.message);
        expect(res[0].trackURI).toBe(fields2.uri);
    });

    test('findSince filter server none', async () => {
        const song1 = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        await song1.save();
        await new Promise((r) => setTimeout(r, 500));
        const timestamp = new Date();
        await new Promise((r) => setTimeout(r, 500));

        const song2 = new Song()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setAuthor(fields2.user)
            .setTrack(fields2.uri);

        await song2.save();

        await new Promise((r) => setTimeout(r, 500));

        const res = await Song.findSince(fields1.guild, timestamp);

        expect(res).toHaveLength(0);
    });

    test('findSince filter server none', async () => {
        const timestamp = new Date();
        await new Promise((r) => setTimeout(r, 500));

        const song1 = new Song()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setAuthor(fields1.user)
            .setTrack(fields1.uri);

        await song1.save();
        await new Promise((r) => setTimeout(r, 500));

        const song2 = new Song()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setAuthor(fields2.user)
            .setTrack(fields2.uri);

        await song2.save();

        await new Promise((r) => setTimeout(r, 500));

        const res = await Song.findSince(fields1.guild, timestamp);

        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Song);
        expect(res[0].timestamp).toBeDefined();
        expect(res[0]._mongoId).toStrictEqual(song1._mongoId);
        expect(res[0].guildID).toBe(fields1.guild);
        expect(res[0].channelID).toBe(fields1.channel);
        expect(res[0].authorID).toBe(fields1.user);
        expect(res[0].messageID).toBe(fields1.message);
        expect(res[0].trackURI).toBe(fields1.uri);
    });
});
