const rewire = require('rewire');

const commandUtilities = rewire('../lib/commands/commandUtilities');

test('commandUtilities.splitStringBySpace', () => {
    expect(commandUtilities.splitStringBySpace('!test')).toEqual(['!test']);
    expect(commandUtilities.splitStringBySpace('!test waffle')).toEqual(['!test', 'waffle']);
    expect(commandUtilities.splitStringBySpace('!test          cats   ')).toEqual(['!test', 'cats']);
    expect(commandUtilities.splitStringBySpace('!test          cats   dogs')).toEqual(['!test', 'cats', 'dogs']);
});

test('commandUtilities.getMember', () => {
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

    expect(commandUtilities.getMember(guild, '<@86890631690977280>')).toEqual(members[0]);
    expect(commandUtilities.getMember(guild, '<@!788091112476770353>')).toEqual(members[1]);
    expect(commandUtilities.getMember(guild, '<@!356984848574971914>')).toEqual(members[2]);
    expect(commandUtilities.getMember(guild, '<@&1111111111>')).toEqual(undefined);
    expect(commandUtilities.getMember(guild, '')).toEqual(undefined);
    expect(commandUtilities.getMember(guild, null)).toEqual(undefined);
});

test('commandUtilities.getRole', () => {
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
            },
        },
    };

    expect(commandUtilities.getRole(guild, '<@&1234567890>')).toEqual(roles[0]);
    expect(commandUtilities.getRole(guild, '<@&0987654321>')).toEqual(roles[1]);
    expect(commandUtilities.getRole(guild, '<@&5432109876>')).toEqual(roles[2]);
    expect(commandUtilities.getRole(guild, '<@&1111111111>')).toEqual(undefined);
    expect(commandUtilities.getRole(guild, '')).toEqual(undefined);
    expect(commandUtilities.getRole(guild, null)).toEqual(undefined);
});

test('commandUtilities.filterRole', () => {
    const validRole = {
        name: 'test',
    };
    const invalidRole1 = {
        name: 'admin',
    };

    const invalidRole2 = null;

    expect(commandUtilities.filterRole(validRole)).toEqual(validRole);
    expect(commandUtilities.filterRole(invalidRole1)).toEqual(null);
    expect(commandUtilities.filterRole(invalidRole2)).toEqual(null);
});

test('commandUtilities.trimDiscordID', () => {
    const trimDiscordID = commandUtilities.__get__('trimDiscordID'); // eslint-disable-line no-underscore-dangle
    expect(trimDiscordID('<@!356956593293754368>')).toBe('356956593293754368'); // with nickname
    expect(trimDiscordID('<@356984848574971914>')).toBe('356984848574971914'); // without nickname
    expect(trimDiscordID('<#788091112476770356>')).toBe('788091112476770356'); // channel id
    expect(trimDiscordID('<@&134362454976102401>')).toBe('134362454976102401'); // role id
    expect(trimDiscordID('this is a cool <@&134362454976102401> role')).toBe('134362454976102401'); // role id
    expect(trimDiscordID('false')).toBe(undefined); // invalid
    expect(trimDiscordID('')).toBe(undefined); // invalid
});

test('commandUtilities.discardCommand', () => {
    expect(commandUtilities.discardCommand('!test')).toBe('');
    expect(commandUtilities.discardCommand('!test waffle')).toBe('waffle');
    expect(commandUtilities.discardCommand('!test          cats   ')).toBe('cats');
    expect(commandUtilities.discardCommand('!test          cats   dogs')).toBe('cats   dogs');
});
