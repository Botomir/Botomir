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
};

const fields2 = {
    guild: '698257589716123781',
    channel: '812553143958896640',
    user: '788093095543177216',
    message: '827754923336794142',
    content: 'I know and the code has so many tests too!!',
};

describe('messages database', () => {
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

    test('Create and save message', async () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content);

        expect(message._mongoId).toBeDefined();
        const savedMessage = await message.save();

        expect(savedMessage.timestamp).toBeDefined();
        expect(savedMessage._mongoId).toBeDefined();
        expect(savedMessage.guildID).toBe(fields.guild);
        expect(savedMessage.channelID).toBe(fields.channel);
        expect(savedMessage.messageID).toBe(fields.message);
        expect(savedMessage.authorID).toBe(fields.user);
        expect(savedMessage.content).toBe(fields.content);
    });

    test('missing guildID', () => {
        const message = new Message()
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing channelID', () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing messageID', () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setAuthor(fields.user)
            .setContent(fields.content);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing userID', () => {
        const message = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setContent(fields.content);

        expect(message._mongoId).toBeDefined();

        return expect(message.save()).rejects.toThrow('required');
    });

    test('missing message content', async () => {
        const message = new Message()
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
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content);

        await message.save();
        const res = await Message.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 1);
        expect(res).toHaveProperty('database', 'Message');
    });

    test('count messages multiple', async () => {
        const message1 = new Message()
            .setGuild(fields.guild)
            .setChannel(fields.channel)
            .setMessage(fields.message)
            .setAuthor(fields.user)
            .setContent(fields.content);

        const message2 = new Message()
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
