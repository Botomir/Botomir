/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Audit, Events } = source('models/audit');

const fields = {
    guild: '788091112476770353',
    channel: '793573047550345237',
    user: '356984848574971914',
    command: '!delete 5',
};

const fields2 = {
    guild: '698257589716123781',
    channel: '812553143958896640',
    user: '788093095543177216',
    command: '!purge 32',
};

describe('Audit database', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('check Event types', () => {
        expect(Object.isFrozen(Events)).toBeTruthy();
        expect(Object.keys(Events)).toHaveLength(6);

        expect(Events.MESSAGE_DELETED).toBe('MESSAGE_DELETED');
        expect(Events.BATCH_MESSAGES_DELETED).toBe('BATCH_MESSAGES_DELETED');
        expect(Events.USER_KICKED).toBe('USER_KICKED');
        expect(Events.USER_BANNED).toBe('USER_BANNED');
        expect(Events.AUDIT_CHECKED).toBe('AUDIT_CHECKED');
        expect(Events.SERVER_NAME_CHANGED).toBe('SERVER_NAME_CHANGED');
    });

    test('Create and save audit event', async () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        expect(auditEvent._mongoId).toBeDefined();

        const savedEvent = await auditEvent.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent._mongoId).toBeDefined();
        expect(savedEvent.guildID).toBe(fields.guild);
        expect(savedEvent.channelID).toBe(fields.channel);
        expect(savedEvent.userID).toBe(fields.user);
        expect(savedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(savedEvent.details).toBe('some cool details');
        expect(savedEvent.status).toBe(0);
        expect(savedEvent.commandInvoked).toBe(fields.command);
        expect(savedEvent.statusLabel).toBe('UNKOWN');
    });

    test('missing guild', () => {
        const auditEvent = new Audit()
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('required');
    });

    test('missing channel', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('required');
    });

    test('missing user', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('required');
    });

    test('invalid guild - server name', () => {
        const auditEvent = new Audit()
            .setGuild('botomir test server')
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - id too long', () => {
        const auditEvent = new Audit()
            .setGuild('788091112476770353788091112476770353')
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - object', () => {
        const auditEvent = new Audit()
            .setGuild({
                id: '1235',
            })
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - channel name', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel('test-channel')
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - id too long', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel('793573047550345237793573047550345237')
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid channel - object', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel({
                id: '1234',
            })
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - user name', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser('botomir')
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - id too long', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser('788093095543177216788093095543177216')
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('invalid user - object', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser({
                id: '1234',
            })
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('validation failed');
    });

    test('missing command', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('required');
    });

    test('missing event', () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setDetails('some cool details');

        return expect(auditEvent.save()).rejects.toThrow('required');
    });

    test('missing details', async () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED);

        const savedEvent = await auditEvent.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent.guildID).toBe(fields.guild);
        expect(savedEvent.channelID).toBe(fields.channel);
        expect(savedEvent.userID).toBe(fields.user);
        expect(savedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(savedEvent.details).toBeUndefined();
        expect(savedEvent.status).toBe(0);
        expect(savedEvent.commandInvoked).toBe(fields.command);
        expect(savedEvent.statusLabel).toBe('UNKOWN');
    });

    test('set status success', async () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details')
            .setSuccess();

        const savedEvent = await auditEvent.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent.guildID).toBe(fields.guild);
        expect(savedEvent.channelID).toBe(fields.channel);
        expect(savedEvent.userID).toBe(fields.user);
        expect(savedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(savedEvent.details).toBe('some cool details');
        expect(savedEvent.status).toBe(1);
        expect(savedEvent.commandInvoked).toBe(fields.command);
        expect(savedEvent.statusLabel).toBe('SUCCESS');
    });

    test('set status failed', async () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details')
            .setFailed();

        const savedEvent = await auditEvent.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent.guildID).toBe(fields.guild);
        expect(savedEvent.channelID).toBe(fields.channel);
        expect(savedEvent.userID).toBe(fields.user);
        expect(savedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(savedEvent.details).toBe('some cool details');
        expect(savedEvent.status).toBe(2);
        expect(savedEvent.commandInvoked).toBe(fields.command);
        expect(savedEvent.statusLabel).toBe('FAILED');
    });

    test('update status success', async () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        const savedEvent = await auditEvent.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent.guildID).toBe(fields.guild);
        expect(savedEvent.channelID).toBe(fields.channel);
        expect(savedEvent.userID).toBe(fields.user);
        expect(savedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(savedEvent.details).toBe('some cool details');
        expect(savedEvent.status).toBe(0);
        expect(savedEvent.commandInvoked).toBe(fields.command);
        expect(savedEvent.statusLabel).toBe('UNKOWN');

        const updatedEvent = await savedEvent.setSuccess().save();

        expect(updatedEvent.timestamp).toBeDefined();
        expect(updatedEvent._mongoId).toBe(savedEvent._mongoId);
        expect(updatedEvent.guildID).toBe(fields.guild);
        expect(updatedEvent.channelID).toBe(fields.channel);
        expect(updatedEvent.userID).toBe(fields.user);
        expect(updatedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(updatedEvent.details).toBe('some cool details');
        expect(updatedEvent.status).toBe(1);
        expect(updatedEvent.commandInvoked).toBe(fields.command);
        expect(updatedEvent.statusLabel).toBe('SUCCESS');
    });

    test('update status failed', async () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        const savedEvent = await auditEvent.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent.timestamp).toBeDefined();
        expect(savedEvent.guildID).toBe(fields.guild);
        expect(savedEvent.channelID).toBe(fields.channel);
        expect(savedEvent.userID).toBe(fields.user);
        expect(savedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(savedEvent.details).toBe('some cool details');
        expect(savedEvent.status).toBe(0);
        expect(savedEvent.commandInvoked).toBe(fields.command);
        expect(savedEvent.statusLabel).toBe('UNKOWN');

        const updatedEvent = await savedEvent.setFailed().save();

        expect(updatedEvent._mongoId).toBe(savedEvent._mongoId);
        expect(updatedEvent.timestamp).toBeDefined();
        expect(updatedEvent.guildID).toBe(fields.guild);
        expect(updatedEvent.channelID).toBe(fields.channel);
        expect(updatedEvent.userID).toBe(fields.user);
        expect(updatedEvent.event).toBe(Events.MESSAGE_DELETED);
        expect(updatedEvent.details).toBe('some cool details');
        expect(updatedEvent.status).toBe(2);
        expect(updatedEvent.commandInvoked).toBe(fields.command);
        expect(updatedEvent.statusLabel).toBe('FAILED');
    });

    test('getServerLog none', () => expect(Audit.getServerLog(fields.guild)).resolves.toHaveLength(0));

    test('getServerLog one', async () => {
        const auditEvent = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        await auditEvent.save();
        const res = await Audit.getServerLog(fields.guild);

        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Audit);
        expect(res[0].timestamp).toBeDefined();
        expect(res[0].guildID).toBe(fields.guild);
        expect(res[0].channelID).toBe(fields.channel);
        expect(res[0].userID).toBe(fields.user);
        expect(res[0].event).toBe(Events.MESSAGE_DELETED);
        expect(res[0].details).toBe('some cool details');
        expect(res[0].status).toBe(0);
        expect(res[0].commandInvoked).toBe(fields.command);
        expect(res[0].statusLabel).toBe('UNKOWN');
    });

    test('getServerLog filter', async () => {
        const auditEvent1 = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        const auditEvent2 = new Audit()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setUser(fields2.user)
            .setCommand(fields2.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        await auditEvent1.save();
        await auditEvent2.save();

        const res = await Audit.getServerLog(fields.guild);

        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Audit);
        expect(res[0].timestamp).toBeDefined();
        expect(res[0].guildID).toBe(fields.guild);
        expect(res[0].channelID).toBe(fields.channel);
        expect(res[0].userID).toBe(fields.user);
        expect(res[0].event).toBe(Events.MESSAGE_DELETED);
        expect(res[0].details).toBe('some cool details');
        expect(res[0].status).toBe(0);
        expect(res[0].commandInvoked).toBe(fields.command);
        expect(res[0].statusLabel).toBe('UNKOWN');
    });

    test('getServerLog sorted', async () => {
        const auditEvent1 = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setUser(fields.user)
            .setCommand(fields.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        await new Promise((r) => setTimeout(r, 500));

        const auditEvent2 = new Audit()
            .setGuild(fields.guild)
            .setChannel(fields2.channel)
            .setUser(fields2.user)
            .setCommand(fields2.command)
            .setEvent(Events.MESSAGE_DELETED)
            .setDetails('some cool details');

        await auditEvent1.save();
        await auditEvent2.save();

        const res = await Audit.getServerLog(fields.guild);

        expect(res).toHaveLength(2);
        expect(res[0]).toBeInstanceOf(Audit);
        expect(res[0].timestamp).toBeDefined();
        expect(res[1].timestamp).toBeDefined();
        expect(res[0].timestamp.valueOf()).toBeGreaterThan(res[1].timestamp.valueOf());
    });
});
