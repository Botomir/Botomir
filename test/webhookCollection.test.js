/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Webhook } = source('models/webhook');

const fields = {
    guild: '788091112476770353',
    channel: '793573047550345237',
    user: '356984848574971914',
};

const fields2 = {
    guild: '698257589716123781',
    channel: '812553143958896640',
    user: '788093095543177216',
};

describe('Webhook database', () => {
    beforeAll(() => mongoose.connect(process.env.MONGO_URL));

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('Create and save webhook', async () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        expect(hook._mongoId).toBeDefined();
        const savedEvent = await hook.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent._mongoId).toBeDefined();
        expect(savedEvent.secret).toBeDefined();
        expect(savedEvent.hookID).toBeDefined();
        expect(savedEvent.guildID).toBe(fields.guild);
        expect(savedEvent.channelID).toBe(fields.channel);
        expect(savedEvent.createdBy).toBe(fields.user);
        expect(savedEvent.message).toBe('a cool event has happened');
        expect(savedEvent.provider).toBe('github');

        // check hookID format
        expect(savedEvent.hookID).toEqual(expect.stringMatching(/^[0-9a-f]{32}$/));
        expect(savedEvent.secret).toEqual(expect.stringMatching(/^[0-9A-F]{32}$/));
    });

    test('missing guild', () => {
        const hook = new Webhook()
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('required');
    });

    test('missing channel', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('required');
    });

    test('missing creator', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('required');
    });

    test('missing message', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('required');
    });

    test('missing providor', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened');

        return expect(hook.save()).rejects.toThrow('required');
    });

    test('invalid guild - server name', () => {
        const hook = new Webhook()
            .setGuild('botomir test server')
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - id too long', () => {
        const hook = new Webhook()
            .setGuild('788091112476770353788091112476770353')
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - object', () => {
        const hook = new Webhook()
            .setGuild({
                id: '1235',
            })
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - channel name', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel('a-cool-channel')
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - id too long', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel('812553143958896640812553143958896640')
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - object', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel({
                id: '1235',
            })
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid creator - user name', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy('botomir')
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid creator - id too long', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy('356984848574971914356984848574971914')
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('invalid creator - object', () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy({
                id: '1235',
            })
            .setMessage('a cool event has happened')
            .setProvider('github');

        return expect(hook.save()).rejects.toThrow('validation failed');
    });

    test('get hook - none', () => expect(Webhook.getHook('d4b85e95ff374064b20869c9c599d47c')).resolves.toBeNull());

    test('get hook - one', async () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        expect(hook._mongoId).toBeDefined();
        const savedEvent = await hook.save();

        const res = await Webhook.getHook(savedEvent.hookID);

        expect(res).toBeInstanceOf(Webhook);

        expect(res.timestamp).toStrictEqual(savedEvent.timestamp);
        expect(res._mongoId).toStrictEqual(savedEvent._mongoId);
        expect(res.secret).toStrictEqual(savedEvent.secret);
        expect(res.hookID).toStrictEqual(savedEvent.hookID);
        expect(res.guildID).toStrictEqual(savedEvent.guildID);
        expect(res.channelID).toStrictEqual(savedEvent.channelID);
        expect(res.createdBy).toStrictEqual(savedEvent.createdBy);
        expect(res.message).toStrictEqual(savedEvent.message);
        expect(res.provider).toStrictEqual(savedEvent.provider);
    });

    test('get server hooks - none', () => expect(Webhook.getServerHooks(fields.guild)).resolves.toHaveLength(0));

    test('get server hooks - one', async () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        expect(hook._mongoId).toBeDefined();
        await hook.save();

        const res = await Webhook.getServerHooks(fields.guild);

        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Webhook);
        expect(res[0].timestamp).toStrictEqual(hook.timestamp);
        expect(res[0]._mongoId).toStrictEqual(hook._mongoId);
        expect(res[0].secret).toStrictEqual(hook.secret);
        expect(res[0].hookID).toStrictEqual(hook.hookID);
        expect(res[0].guildID).toStrictEqual(hook.guildID);
        expect(res[0].channelID).toStrictEqual(hook.channelID);
        expect(res[0].createdBy).toStrictEqual(hook.createdBy);
        expect(res[0].message).toStrictEqual(hook.message);
        expect(res[0].provider).toStrictEqual(hook.provider);
    });

    test('get server hooks - filter server', async () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        const hook2 = new Webhook()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setCreatedBy(fields2.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        await hook.save();
        await hook2.save();

        const res = await Webhook.getServerHooks(fields.guild);

        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Webhook);
        expect(res[0].timestamp).toStrictEqual(hook.timestamp);
        expect(res[0]._mongoId).toStrictEqual(hook._mongoId);
        expect(res[0].secret).toStrictEqual(hook.secret);
        expect(res[0].hookID).toStrictEqual(hook.hookID);
        expect(res[0].guildID).toStrictEqual(hook.guildID);
        expect(res[0].channelID).toStrictEqual(hook.channelID);
        expect(res[0].createdBy).toStrictEqual(hook.createdBy);
        expect(res[0].message).toStrictEqual(hook.message);
        expect(res[0].provider).toStrictEqual(hook.provider);
    });

    test('get server hooks - multiple server', async () => {
        const hook = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCreatedBy(fields.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        const hook2 = new Webhook()
            .setGuild(fields.guild)
            .setChannel(fields2.channel)
            .setCreatedBy(fields2.user)
            .setMessage('a cool event has happened')
            .setProvider('github');

        await hook.save();
        await hook2.save();

        const res = await Webhook.getServerHooks(fields.guild);

        expect(res).toHaveLength(2);
        expect(res[0]).toBeInstanceOf(Webhook);
        expect(res[1]).toBeInstanceOf(Webhook);

        expect(res[0]._mongoId).toStrictEqual(hook._mongoId);
        expect(res[1]._mongoId).toStrictEqual(hook2._mongoId);
    });
});
