/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Role } = source('models/role');

const fields1 = {
    guild: '788091112476770353',
    roleName: 'admin',
    emoji: 'code_monkey',
};

const fields2 = {
    guild: '698257589716123781',
    roleName: 'test-role',
    emoji: '🔥',
};

const fields3 = {
    guild: '698257589716123781',
    roleName: 'another-role',
    emoji: 'test_emote',
};

describe('roles database', () => {
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

    test('Create and save role discord', async () => {
        const role = new Role()
            .setGuild(fields1.guild)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        expect(role._mongoId).toBeDefined();
        const saved = await role.save();

        expect(saved._mongoId).toBeDefined();
        expect(saved.guildID).toBe(fields1.guild);
        expect(saved.emoji).toBe(fields1.emoji);
        expect(saved.roleName).toBe(fields1.roleName);
    });

    test('Create and save role unicode', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        const saved = await role.save();

        expect(saved._mongoId).toBeDefined();
        expect(saved.guildID).toBe(fields2.guild);
        expect(saved.emoji).toBe(fields2.emoji);
        expect(saved.roleName).toBe(fields2.roleName);
    });

    test('missing guild', () => {
        const role = new Role()
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('required');
    });

    test('missing emoji', () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('required');
    });

    test('missing role name', () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('required');
    });

    test('invalid guild - server name', () => {
        const role = new Role()
            .setGuild('test guild')
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - id too long', () => {
        const role = new Role()
            .setGuild('698257589716123781698257589716123781')
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - object', () => {
        const role = new Role()
            .setGuild({
                id: '1234',
            })
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('validation failed');
    });

    test('findRole none', async () => {
        const res = await Role.findRole(fields1.guild, fields2.emoji);
        expect(res).toBeNull();
    });

    test('findRole filter guild', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(fields1.guild, fields2.emoji);
        expect(res).toBeNull();
    });

    test('findRole filter emoji', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(fields2.guild, fields1.emoji);
        expect(res).toBeNull();
    });

    test('findRole filter find discord', async () => {
        const role = new Role()
            .setGuild(fields1.guild)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(fields1.guild, fields1.emoji);
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role._mongoId);
        expect(res.guildID).toBe(fields1.guild);
        expect(res.emoji).toBe(fields1.emoji);
        expect(res.roleName).toBe(fields1.roleName);
    });

    test('findRole filter find unicode', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(fields2.guild, fields2.emoji);
        expect(res).not.toBeNull();
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role._mongoId);
        expect(res.guildID).toBe(fields2.guild);
        expect(res.emoji).toBe(fields2.emoji);
        expect(res.roleName).toBe(fields2.roleName);
    });

    test('delete none', () => expect(Role.removeServerRoles(fields1.guild)).resolves.not.toBeNull());

    test('delete one', async () => {
        const role = new Role()
            .setGuild(fields1.guild)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(fields1.guild, fields1.emoji);
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role._mongoId);

        await Role.removeServerRoles(fields1.guild);
        const res2 = await Role.findRole(fields1.guild, fields1.emoji);
        expect(res2).toBeNull();
    });

    test('delete only one server', async () => {
        const role1 = new Role()
            .setGuild(fields1.guild)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.findRole(fields1.guild, fields1.emoji);
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role1._mongoId);

        await Role.removeServerRoles(fields1.guild);
        const res2 = await Role.findRole(fields1.guild, fields1.emoji);
        expect(res2).toBeNull();

        const res3 = await Role.findRole(fields2.guild, fields2.emoji);
        expect(res3).toBeInstanceOf(Role);
        expect(res3._mongoId).toStrictEqual(role2._mongoId);
    });

    test('delete only multiple', async () => {
        const role1 = new Role()
            .setGuild(fields3.guild)
            .setEmoji(fields3.emoji)
            .setRole(fields3.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.findRole(fields2.guild, fields2.emoji);
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role2._mongoId);

        const res1 = await Role.findRole(fields3.guild, fields3.emoji);
        expect(res1).toBeInstanceOf(Role);
        expect(res1._mongoId).toStrictEqual(role1._mongoId);

        await Role.removeServerRoles(fields2.guild);
        const res2 = await Role.findRole(fields2.guild, fields2.emoji);
        expect(res2).toBeNull();

        const res3 = await Role.findRole(fields3.guild, fields3.emoji);
        expect(res3).toBeNull();
    });

    test('count none', async () => {
        const res = await Role.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 0);
        expect(res).toHaveProperty('database', 'Role');
    });

    test('count several', async () => {
        const role1 = new Role()
            .setGuild(fields3.guild)
            .setEmoji(fields3.emoji)
            .setRole(fields3.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 2);
        expect(res).toHaveProperty('database', 'Role');
    });
});
