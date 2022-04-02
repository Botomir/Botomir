/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Responses } = source('models/responses');

const fields1 = {
    guild: '788091112476770353',
    message: 'I am the greatest bot there is',
    mode: 'GOOD_BOT',
};

const fields2 = {
    guild: '698257589716123781',
    message: 'I am the best bot ever',
    mode: 'GOOD_BOT',
};

const fields3 = {
    guild: '698257589716123781',
    message: ':( sad bot',
    mode: 'BAD_BOT',
};

const fields4 = {
    guild: '698257589716123781',
    message: 'I am an evil bot',
    mode: 'BAD_BOT',
};

describe('responses database', () => {
    beforeAll(() => mongoose.connect(process.env.MONGO_URL));

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('Create and save responses', async () => {
        const response = new Responses()
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setBotMode(fields1.mode);

        expect(response._mongoId).toBeDefined();
        const saved = await response.save();

        expect(saved._mongoId).toBeDefined();
        expect(saved.guildID).toBe(fields1.guild);
        expect(saved.message).toBe(fields1.message);
        expect(saved.botMode).toBe(fields1.mode);
    });

    test('missing guild', () => {
        const response = new Responses()
            .setMessage(fields1.message)
            .setBotMode(fields1.mode);

        expect(response._mongoId).toBeDefined();
        return expect(response.save()).rejects.toThrow('required');
    });

    test('missing message', () => {
        const response = new Responses()
            .setGuild(fields1.guild)
            .setBotMode(fields1.mode);

        expect(response._mongoId).toBeDefined();
        return expect(response.save()).rejects.toThrow('required');
    });

    test('missing mode', () => {
        const response = new Responses()
            .setGuild(fields1.guild)
            .setMessage(fields1.message);

        expect(response._mongoId).toBeDefined();
        return expect(response.save()).rejects.toThrow('required');
    });

    test('invalid guild - server name', () => {
        const response = new Responses()
            .setGuild('botomir test')
            .setMessage(fields1.message)
            .setBotMode(fields1.mode);

        expect(response._mongoId).toBeDefined();
        return expect(response.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - id too long', () => {
        const response = new Responses()
            .setGuild('698257589716123781698257589716123781')
            .setMessage(fields1.message)
            .setBotMode(fields1.mode);

        expect(response._mongoId).toBeDefined();
        return expect(response.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - object', () => {
        const response = new Responses()
            .setGuild({
                id: '1234',
            })
            .setMessage(fields1.message)
            .setBotMode(fields1.mode);

        expect(response._mongoId).toBeDefined();
        return expect(response.save()).rejects.toThrow('validation failed');
    });

    test('findForMode none', async () => {
        const res = await Responses.findForMode(fields1.guild, fields1.mode);
        expect(res).toHaveLength(0);
    });

    test('findForMode one', async () => {
        const response = new Responses()
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setBotMode(fields1.mode);

        expect(response._mongoId).toBeDefined();
        await response.save();

        const res = await Responses.findForMode(fields1.guild, fields1.mode);
        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Responses);
        expect(res[0].guildID).toBe(fields1.guild);
        expect(res[0].message).toBe(fields1.message);
        expect(res[0].botMode).toBe(fields1.mode);
    });

    test('findForMode filter guild', async () => {
        const response1 = new Responses()
            .setGuild(fields1.guild)
            .setMessage(fields1.message)
            .setBotMode(fields1.mode);

        const response2 = new Responses()
            .setGuild(fields2.guild)
            .setMessage(fields2.message)
            .setBotMode(fields2.mode);

        await response1.save();
        await response2.save();

        const res = await Responses.findForMode(fields1.guild, fields1.mode);
        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Responses);
        expect(res[0].guildID).toBe(fields1.guild);
        expect(res[0].message).toBe(fields1.message);
        expect(res[0].botMode).toBe(fields1.mode);
    });

    test('findForMode filter mode', async () => {
        const response1 = new Responses()
            .setGuild(fields3.guild)
            .setMessage(fields3.message)
            .setBotMode(fields3.mode);

        const response2 = new Responses()
            .setGuild(fields4.guild)
            .setMessage(fields4.message)
            .setBotMode(fields4.mode);

        await response1.save();
        await response2.save();

        const res = await Responses.findForMode(fields3.guild, fields3.mode);
        expect(res).toHaveLength(2);
        expect(res[0]).toBeInstanceOf(Responses);
        expect(res[1]).toBeInstanceOf(Responses);
    });
});
