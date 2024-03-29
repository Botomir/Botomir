/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Message } = source('models/message');

const fields = {
    guild: '788091112476770353',
    channel: '793573047550345237',
    user: '356984848574971914',
    message: '827754923844042802',
    content: 'this is an amazing bot',
    createdTimestamp: 1621110714250,
};

const fields2 = {
    guild: '698257589716123781',
    channel: '812553143958896640',
    createdTimestamp: 1621110714333,
    user: '788093095543177216',
    message: '827754923336794142',
    content: 'I know and the code has so many tests too!!',
};

describe('messages database', () => {
    beforeAll(() => mongoose.connect(process.env.MONGO_URL));

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('Create and save message', async () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setCreatedAt(fields.createdTimestamp)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        const savedMessage = await message.save();

        expect(savedMessage.timestamp).toEqual(new Date('2021-05-15T20:31:54.250Z'));
        expect(savedMessage._mongoId).toBeDefined();
        expect(savedMessage.guildID).toBe(fields.guild);
        expect(savedMessage.channelID).toBe(fields.channel);
        expect(savedMessage.messageID).toBe(fields.message);
        expect(savedMessage.authorID).toBe(fields.user);
        expect(savedMessage.content).toBe(fields.content);
        expect(savedMessage.edits).toHaveLength(1);

        expect(savedMessage.deleted).toBe(false);
        expect(savedMessage.deletedAt).not.toBeDefined();
    });

    test('update message', async () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setCreatedAt(fields.createdTimestamp)
            .setContent(fields.content, fields.createdTimestamp);

        message.setContent('updated text here', fields2.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        const savedMessage = await message.save();

        expect(savedMessage.timestamp).toEqual(new Date('2021-05-15T20:31:54.250Z'));
        expect(savedMessage.edits).toHaveLength(2);
        expect(savedMessage.content).toBe('updated text here');

        expect(savedMessage.edits[0].editedAt).toEqual(new Date('2021-05-15T20:31:54.250Z'));
        expect(savedMessage.edits[0]._mongoId).not.toBeDefined();
        expect(savedMessage.edits[0].content).toBe(fields.content);

        expect(savedMessage.edits[1].editedAt).toEqual(new Date('2021-05-15T20:31:54.333Z'));
        expect(savedMessage.edits[1]._mongoId).not.toBeDefined();
        expect(savedMessage.edits[1].content).toBe('updated text here');
    });

    test('multiple update message', async () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setCreatedAt(fields.createdTimestamp)
            .setContent(fields.content, fields.createdTimestamp);

        message.setContent('updated text here', fields2.createdTimestamp);
        message.setContent('another update', '1621781592137');

        expect(message._mongoId).toBeDefined();
        const savedMessage = await message.save();

        expect(savedMessage.timestamp).toEqual(new Date('2021-05-15T20:31:54.250Z'));
        expect(savedMessage.edits).toHaveLength(3);
        expect(savedMessage.content).toBe('another update');

        expect(savedMessage.edits[0].editedAt).toEqual(new Date('2021-05-15T20:31:54.250Z'));
        expect(savedMessage.edits[0]._mongoId).not.toBeDefined();
        expect(savedMessage.edits[0].content).toBe(fields.content);

        expect(savedMessage.edits[1].editedAt).toEqual(new Date('2021-05-15T20:31:54.333Z'));
        expect(savedMessage.edits[1]._mongoId).not.toBeDefined();
        expect(savedMessage.edits[1].content).toBe('updated text here');

        expect(savedMessage.edits[2].editedAt).toEqual(new Date('2021-05-23T14:53:12.137Z'));
        expect(savedMessage.edits[2]._mongoId).not.toBeDefined();
        expect(savedMessage.edits[2].content).toBe('another update');
    });

    test('delete message', async () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setCreatedAt(fields.createdTimestamp)
            .setContent(fields.content, fields.createdTimestamp);
        message.delete();

        expect(message._mongoId).toBeDefined();
        const savedMessage = await message.save();

        expect(savedMessage.deleted).toBe(true);
        expect(savedMessage.deletedAt).toBeDefined();
    });

    test('missing guildID', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing channelID', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing messageID', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing userID', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing timestamp', async () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        expect(message._mongoId).toBeDefined();
        const savedMessage = await message.save();

        expect(savedMessage.timestamp).toBeDefined();
        expect(savedMessage.timestamp).not.toEqual('2021-05-15T20:31:54.250Z');
        expect(savedMessage._mongoId).toBeDefined();
        expect(savedMessage.guildID).toBe(fields.guild);
        expect(savedMessage.channelID).toBe(fields.channel);
        expect(savedMessage.messageID).toBe(fields.message);
        expect(savedMessage.authorID).toBe(fields.user);
        expect(savedMessage.content).toBe(fields.content);
    });

    test('invalid guildID - server name', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild('botomir testing server')
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('invalid guildID - id too long', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild('788091112476770353788091112476770353')
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('invalid guildID - object', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild({
                id: '12345',
            })
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('invalid channelID - channel name', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel('test-bot')
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('invalid channelID - id too long', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel('793573047550345237793573047550345237')
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('invalid channelID - object', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel({
                id: '12345',
            })
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('missing messageID - message text', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage('a super cool message about bots')
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('missing messageID - id too long', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage('827754923844042802827754923844042802')
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('missing messageID - object', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage({
                id: '12345',
            })
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('missing userID - user name', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor('botomir')
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('missing userID - id too long', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor('356984848574971914356984848574971914')
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('missing userID - object', () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor({
                id: '12345',
            })
            .setContent(fields.content, fields.createdTimestamp);

        expect(message._mongoId).toBeDefined();
        return expect(message.save()).rejects.toThrow('validation failed');
    });

    test('missing message content', async () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user);

        expect(message._mongoId).toBeDefined();
        const savedMessage = await message.save();

        expect(savedMessage.timestamp).toBeDefined();
        expect(savedMessage._mongoId).toBeDefined();
        expect(savedMessage.guildID).toBe(fields.guild);
        expect(savedMessage.channelID).toBe(fields.channel);
        expect(savedMessage.messageID).toBe(fields.message);
        expect(savedMessage.authorID).toBe(fields.user);
        expect(savedMessage.content).toBeUndefined();
    });

    test('count messages none', async () => {
        const res = await Message.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 0);
        expect(res).toHaveProperty('database', 'Message');
    });

    test('count messages one', async () => {
        const message = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        await message.save();
        const res = await Message.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 1);
        expect(res).toHaveProperty('database', 'Message');
    });

    test('count messages multiple', async () => {
        const message1 = new Message()
            .setCreatedAt(fields.createdTimestamp)
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content, fields.createdTimestamp);

        const message2 = new Message()
            .setCreatedAt(fields2.createdTimestamp)
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setAuthor(fields2.user)
            .setContent(fields2.content);

        await message1.save();
        await message2.save();
        const res = await Message.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 2);
        expect(res).toHaveProperty('database', 'Message');
    });
});
