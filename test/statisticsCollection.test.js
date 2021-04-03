/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Statistics, EventTypes } = source('models/statistics');

const guild1 = '788091112476770353';
const guild2 = '698257589716123781';

describe('Statistics database', () => {
    beforeAll(() => {
        const mongooseOpts = {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        return mongoose.connect(process.env.MONGO_URL, mongooseOpts);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('check Event types', () => {
        expect(Object.isFrozen(EventTypes)).toBeTruthy();
        expect(Object.keys(EventTypes)).toHaveLength(8);

        expect(EventTypes.PLAYLIST_CREATED).toBe('PLAYLIST_CREATED');
        expect(EventTypes.ROLE_ASSIGNED).toBe('ROLE_ASSIGNED');
        expect(EventTypes.ROLE_REMOVED).toBe('ROLE_REMOVED');
        expect(EventTypes.COMMAND_EXECUTED).toBe('COMMAND_EXECUTED');
        expect(EventTypes.GOOD_BOT).toBe('GOOD_BOT');
        expect(EventTypes.BAD_BOT).toBe('BAD_BOT');
        expect(EventTypes.PUPPYS_SHOWN).toBe('PUPPYS_SHOWN');
        expect(EventTypes.MEMES_SENT).toBe('MEMES_SENT');
    });

    test('Create and save stats event', async () => {
        const statsEvent = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        expect(statsEvent._mongoId).toBeDefined();

        const savedEvent = await statsEvent.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent._mongoId).toBeDefined();
        expect(savedEvent.guildID).toBe(guild1);
        expect(savedEvent.event).toBe(EventTypes.PLAYLIST_CREATED);
        expect(savedEvent.details).toBe('some cool details');
    });

    test('missing guild', () => {
        const statsEvent = new Statistics()
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        expect(statsEvent._mongoId).toBeDefined();

        return expect(statsEvent.save()).rejects.toThrow('required');
    });

    test('missing event', () => {
        const statsEvent = new Statistics()
            .setGuild(guild1)
            .setDetails('some cool details');

        expect(statsEvent._mongoId).toBeDefined();

        return expect(statsEvent.save()).rejects.toThrow('required');
    });

    test('missing details', async () => {
        const statsEvent = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED);

        expect(statsEvent._mongoId).toBeDefined();

        const savedEvent = await statsEvent.save();

        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent._mongoId).toBeDefined();
        expect(savedEvent.guildID).toBe(guild1);
        expect(savedEvent.event).toBe(EventTypes.PLAYLIST_CREATED);
        expect(savedEvent.details).toBeUndefined();
    });

    test('countEvent none', async () => {
        const res = await Statistics.countEvent(guild1, EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 0);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('countEvent one', async () => {
        const statsEvent = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        await statsEvent.save();
        const res = await Statistics.countEvent(guild1, EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 1);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('countEvent filter event', async () => {
        const statsEvent1 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        const statsEvent2 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.ROLE_ASSIGNED)
            .setDetails('some cool details');

        await statsEvent1.save();
        await statsEvent2.save();
        const res = await Statistics.countEvent(guild1, EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 1);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('countEvent filter guild', async () => {
        const statsEvent1 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        const statsEvent2 = new Statistics()
            .setGuild(guild2)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        await statsEvent1.save();
        await statsEvent2.save();
        const res = await Statistics.countEvent(guild1, EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 1);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('countEvent multiple ', async () => {
        const statsEvent1 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        const statsEvent2 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        await statsEvent1.save();
        await statsEvent2.save();
        const res = await Statistics.countEvent(guild1, EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 2);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('totalEvents none', async () => {
        const res = await Statistics.totalEvents(EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 0);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('totalEvents one', async () => {
        const statsEvent = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        await statsEvent.save();
        const res = await Statistics.totalEvents(EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 1);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('totalEvents filter event', async () => {
        const statsEvent1 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        const statsEvent2 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.ROLE_ASSIGNED)
            .setDetails('some cool details');

        await statsEvent1.save();
        await statsEvent2.save();
        const res = await Statistics.totalEvents(EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 1);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });

    test('totalEvents filter multiple', async () => {
        const statsEvent1 = new Statistics()
            .setGuild(guild1)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        const statsEvent2 = new Statistics()
            .setGuild(guild2)
            .setEvent(EventTypes.PLAYLIST_CREATED)
            .setDetails('some cool details');

        await statsEvent1.save();
        await statsEvent2.save();
        const res = await Statistics.totalEvents(EventTypes.PLAYLIST_CREATED);

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 2);
        expect(res).toHaveProperty('event', EventTypes.PLAYLIST_CREATED);
    });
});
