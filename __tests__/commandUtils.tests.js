const rewire = require('rewire');

const util = rewire('../bot/utils/util');

test('util.getMember', () => {
    const members = [
        {
            id: '86890631690977280',
        },
        {
            id: '788091112476770353',
        },
        {
            id: '356984848574971914',
        },
    ];

    const guild = {
        members: {
            cache: {
                get: (id) => {
                    if (id === '86890631690977280') {
                        return members[0];
                    } if (id === '788091112476770353') {
                        return members[1];
                    } if (id === '356984848574971914') {
                        return members[2];
                    }
                    return undefined;
                },
            },
        },
    };

    expect(util.getMember(guild, '<@86890631690977280>')).toEqual(members[0]);
    expect(util.getMember(guild, '<@!788091112476770353>')).toEqual(members[1]);
    expect(util.getMember(guild, '<@!356984848574971914>')).toEqual(members[2]);
    expect(util.getMember(guild, '<@&1111111111>')).toEqual(undefined);
    expect(util.getMember(guild, '')).toEqual(undefined);
    expect(util.getMember(guild, null)).toEqual(undefined);
});

test('util.getRole', () => {
    const roles = [
        {
            id: '1234567890', name: 'test',
        },
        {
            id: '0987654321', name: 'admin',
        },
        {
            id: '5432109876', name: 'bot',
        },
    ];

    const guild = {
        roles: {
            cache: {
                get: (id) => {
                    if (id === '1234567890') {
                        return roles[0];
                    } if (id === '0987654321') {
                        return roles[1];
                    } if (id === '5432109876') {
                        return roles[2];
                    }
                    return undefined;
                },
                find: (f) => roles.find(f),
            },
        },
    };

    expect(util.lookupRoleName(guild, 'test')).toEqual(roles[0]);
    expect(util.lookupRoleName(guild, 'admin')).toEqual(roles[1]);
    expect(util.lookupRoleName(guild, 'bot')).toEqual(roles[2]);
    expect(util.lookupRoleName(guild, 'hahahah')).toEqual(undefined);
    expect(util.lookupRoleName(guild, '')).toEqual(undefined);
    expect(util.lookupRoleName(guild, null)).toEqual(undefined);
});

test('util.filterRole', () => {
    const validRole = {
        name: 'test',
    };
    const invalidRole1 = {
        name: 'admin',
    };

    const invalidRole2 = null;

    expect(util.filterRole(validRole)).toEqual(validRole);
    expect(util.filterRole(invalidRole1)).toEqual(null);
    expect(util.filterRole(invalidRole2)).toEqual(null);
});

test('util.trimDiscordID', () => {
    const trimDiscordID = util.__get__('trimDiscordID'); // eslint-disable-line no-underscore-dangle
    expect(trimDiscordID('<@!356956593293754368>')).toBe('356956593293754368'); // with nickname
    expect(trimDiscordID('<@356984848574971914>')).toBe('356984848574971914'); // without nickname
    expect(trimDiscordID('<#788091112476770356>')).toBe('788091112476770356'); // channel id
    expect(trimDiscordID('<@&134362454976102401>')).toBe('134362454976102401'); // role id
    expect(trimDiscordID('this is a cool <@&134362454976102401> role')).toBe('134362454976102401'); // role id
    expect(trimDiscordID('false')).toBe(undefined); // invalid
    expect(trimDiscordID('')).toBe(undefined); // invalid
});
