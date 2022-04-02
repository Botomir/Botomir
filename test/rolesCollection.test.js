/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const { Role } = source('models/role');

const fields1 = {
    guild: '788091112476770353',
    channel: '790689744962322482',
    message: '842242762278436864',
    roleName: 'admin',
    roleID: '790682160368844822',
    emoji: 'code_monkey',
};

const fields2 = {
    guild: '698257589716123781',
    channel: '788129482875600927',
    message: '841170173753819156',
    roleName: 'test-role',
    roleID: '790690034272436254',
    emoji: '🔥',
};

const fields3 = {
    guild: '698257589716123781',
    channel: '840781330538168350',
    message: '841170021693521921',
    roleID: '840805078331293696',
    roleName: 'another-role',
    emoji: 'test_emote',
};

describe('roles database', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('Create and save role discord', async () => {
        const role = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        expect(role._mongoId).toBeDefined();
        const saved = await role.save();

        expect(saved._mongoId).toBeDefined();
        expect(saved.guildID).toBe(fields1.guild);
        expect(saved.channelID).toBe(fields1.channel);
        expect(saved.messageID).toBe(fields1.message);
        expect(saved.roleID).toBe(fields1.roleID);
        expect(saved.emoji).toBe(fields1.emoji);
        expect(saved.roleName).toBe(fields1.roleName);
    });

    test('Create and save role unicode', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        const saved = await role.save();

        expect(saved._mongoId).toBeDefined();
        expect(saved.guildID).toBe(fields2.guild);
        expect(saved.channelID).toBe(fields2.channel);
        expect(saved.messageID).toBe(fields2.message);
        expect(saved.roleID).toBe(fields2.roleID);
        expect(saved.emoji).toBe(fields2.emoji);
        expect(saved.roleName).toBe(fields2.roleName);
    });

    test('missing guild', () => {
        const role = new Role()
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('required');
    });

    test('missing emoji', () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('required');
    });

    test('missing role name', () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('required');
    });

    test('invalid guild - server name', () => {
        const role = new Role()
            .setGuild('test guild')
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - id too long', () => {
        const role = new Role()
            .setGuild('698257589716123781698257589716123781')
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
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
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        return expect(role.save()).rejects.toThrow('validation failed');
    });

    test('findRole none', async () => {
        const res = await Role.findRole(
            fields1.guild,
            fields1.channel,
            fields1.message,
            fields1.emoji,
        );
        expect(res).toBeNull();
    });

    test('findRole filter guild', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(
            fields1.guild,
            fields2.channel,
            fields2.message,
            fields2.emoji,
        );
        expect(res).toBeNull();
    });

    test('findRole filter emoji', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(
            fields2.guild,
            fields2.channel,
            fields2.message,
            fields1.emoji,
        );
        expect(res).toBeNull();
    });

    test('findRole filter find discord', async () => {
        const role = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(
            fields1.guild,
            fields1.channel,
            fields1.message,
            fields1.emoji,
        );
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role._mongoId);
        expect(res.guildID).toBe(fields1.guild);
        expect(res.channelID).toBe(fields1.channel);
        expect(res.messageID).toBe(fields1.message);
        expect(res.roleID).toBe(fields1.roleID);
        expect(res.emoji).toBe(fields1.emoji);
        expect(res.roleName).toBe(fields1.roleName);
    });

    test('findRole filter find unicode', async () => {
        const role = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(
            fields2.guild,
            fields2.channel,
            fields2.message,
            fields2.emoji,
        );
        expect(res).not.toBeNull();
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role._mongoId);
        expect(res.guildID).toBe(fields2.guild);
        expect(res.channelID).toBe(fields2.channel);
        expect(res.messageID).toBe(fields2.message);
        expect(res.roleID).toBe(fields2.roleID);
        expect(res.emoji).toBe(fields2.emoji);
        expect(res.roleName).toBe(fields2.roleName);
    });

    test('delete none', () => expect(Role.removeWatchedMessage(fields1.guild, fields1.channel, fields1.message)).resolves.not.toBeNull());

    test('delete one', async () => {
        const role = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        expect(role._mongoId).toBeDefined();
        await role.save();

        const res = await Role.findRole(
            fields1.guild,
            fields1.channel,
            fields1.message,
            fields1.emoji,
        );
        expect(res).toBeInstanceOf(Role);
        expect(res._mongoId).toStrictEqual(role._mongoId);

        await Role.removeWatchedMessage(fields1.guild, fields1.channel, fields1.message);
        const res2 = await Role.findRole(
            fields1.guild,
            fields1.channel,
            fields1.message,
            fields1.emoji,
        );
        expect(res2).toBeNull();
    });

    test('delete only one server', async () => {
        const role1 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        await Role.removeWatchedMessage(fields1.guild, fields1.channel, fields1.message);

        const res2 = await Role.findRole(
            fields1.guild,
            fields1.channel,
            fields1.message,
            fields1.emoji,
        );
        expect(res2).toBeNull();

        const res3 = await Role.findRole(
            fields2.guild,
            fields2.channel,
            fields2.message,
            fields2.emoji,
        );
        expect(res3).toBeInstanceOf(Role);
        expect(res3._mongoId).toStrictEqual(role2._mongoId);
    });

    test('delete only multiple', async () => {
        const role1 = new Role()
            .setGuild(fields3.guild)
            .setChannel(fields3.channel)
            .setMessage(fields3.message)
            .setRoleID(fields3.roleID)
            .setEmoji(fields3.emoji)
            .setRole(fields3.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        await Role.removeWatchedMessage(fields2.guild, fields2.channel, fields2.message);

        const res2 = await Role.findRole(
            fields2.guild,
            fields2.channel,
            fields2.message,
            fields2.emoji,
        );
        expect(res2).toBeNull();

        const res3 = await Role.findRole(
            fields3.guild,
            fields3.channel,
            fields3.message,
            fields3.emoji,
        );
        expect(res3).not.toBeNull();
    });

    test('delete only one watch message', async () => {
        const role1 = new Role()
            .setGuild(fields3.guild)
            .setChannel(fields3.channel)
            .setMessage(fields3.message)
            .setRoleID(fields3.roleID)
            .setEmoji(fields3.emoji)
            .setRole(fields3.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        const role3 = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields3.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();
        await role3.save();

        await Role.removeWatchedMessage(fields2.guild, fields2.channel, fields2.message);

        const res2 = await Role.findRole(
            fields2.guild,
            fields2.channel,
            fields2.message,
            fields2.emoji,
        );
        expect(res2).toBeNull();

        const res3 = await Role.findRole(
            fields2.guild,
            fields2.channel,
            fields3.message,
            fields2.emoji,
        );
        expect(res3).not.toBeNull();
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
            .setChannel(fields3.channel)
            .setMessage(fields3.message)
            .setRoleID(fields3.roleID)
            .setEmoji(fields3.emoji)
            .setRole(fields3.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.count();

        expect(Object.keys(res)).toHaveLength(2);
        expect(res).toHaveProperty('count', 2);
        expect(res).toHaveProperty('database', 'Role');
    });

    test('find no messages being watched', async () => {
        const res = await Role.findWatchMessages(fields1.guild);
        expect(res).toHaveLength(0);
    });

    test('find one message with multiple reactions', async () => {
        const role1 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        const role2 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.findWatchMessages(fields1.guild);
        expect(res).toHaveLength(1);

        expect(res[0]).toHaveProperty('guild', fields1.guild);
        expect(res[0]).toHaveProperty('channel', fields1.channel);
        expect(res[0]).toHaveProperty('message', fields1.message);
    });

    test('find multiple channels one guild', async () => {
        const role1 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        const role2 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.findWatchMessages(fields1.guild);
        expect(res).toHaveLength(2);

        expect(res[0]).toHaveProperty('guild', fields1.guild);
        expect(res[0]).toHaveProperty('channel');
        expect(res[0]).toHaveProperty('message');

        expect(res[1]).toHaveProperty('guild', fields1.guild);
        expect(res[1]).toHaveProperty('channel');
        expect(res[1]).toHaveProperty('message');
    });

    test('find multiple guilds', async () => {
        const role1 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        const role2 = new Role()
            .setGuild(fields2.guild)
            .setChannel(fields2.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.findWatchMessages(fields1.guild);
        expect(res).toHaveLength(1);

        expect(res[0]).toHaveProperty('guild', fields1.guild);
        expect(res[0]).toHaveProperty('channel', fields1.channel);
        expect(res[0]).toHaveProperty('message', fields1.message);
    });

    test('find multiple messages in the same channel', async () => {
        const role1 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields1.message)
            .setRoleID(fields1.roleID)
            .setEmoji(fields1.emoji)
            .setRole(fields1.roleName);

        const role2 = new Role()
            .setGuild(fields1.guild)
            .setChannel(fields1.channel)
            .setMessage(fields2.message)
            .setRoleID(fields2.roleID)
            .setEmoji(fields2.emoji)
            .setRole(fields2.roleName);

        await role1.save();
        await role2.save();

        const res = await Role.findWatchMessages(fields1.guild);
        expect(res).toHaveLength(2);

        expect(res[0]).toHaveProperty('guild', fields1.guild);
        expect(res[0]).toHaveProperty('channel', fields1.channel);
        expect(res[0]).toHaveProperty('message');

        expect(res[1]).toHaveProperty('guild', fields1.guild);
        expect(res[1]).toHaveProperty('channel', fields1.channel);
        expect(res[1]).toHaveProperty('message');
    });
});
