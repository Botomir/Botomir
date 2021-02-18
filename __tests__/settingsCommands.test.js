const rewire = require('rewire');

const roleParsing = rewire('../lib/utils/roleParsing');
const source = require('rfr');

const { Role } = source('lib/database/models/role');

const roleMessage = `
Hello Welcome to the Scarborough Support Squad. This is the list of available channels, you gain access to the channels by receiving the role associated with it
React to give yourself a role.

<:code monkey:790612474290110505> : Code Monkey
🔥: Keeb`;

test('roleParsing.parseEmoji', () => {
    const parseEmoji = roleParsing.__get__('parseEmoji'); // eslint-disable-line no-underscore-dangle
    expect(parseEmoji('<:code monkey:790612474290110505>')).toEqual('code monkey');
    expect(parseEmoji('<:code monkey:790612474290110505> another emoji <:waggle:7901232474290110505>')).toEqual(null);
    expect(parseEmoji('🔥')).toEqual('🔥');
    expect(parseEmoji('🔥should not match')).toEqual('🔥');
    expect(parseEmoji('not a match')).toEqual(null);
});

test('roleParsing.parseRoleMessage', () => {
    const parseRoleMessage = roleParsing.__get__('parseRoleMessage'); // eslint-disable-line no-underscore-dangle
    const expected = [
        new Role().setEmoji('code monkey').setRole('Code Monkey'),
        new Role().setEmoji('🔥').setRole('Keeb'),
    ];

    const res = parseRoleMessage(roleMessage);
    expect(res).toHaveLength(2);
    expect(res[0].guildID).not.toBeDefined();
    expect(res[1].guildID).not.toBeDefined();

    expect(res[0].emoji).toBe(expected[0].emoji);
    expect(res[1].emoji).toBe(expected[1].emoji);

    expect(res[0].roleName).toBe(expected[0].roleName);
    expect(res[1].roleName).toBe(expected[1].roleName);
});

test('roleParsing.removeRoleHeader', () => {
    const removeRoleHeader = roleParsing.__get__('removeRoleHeader'); // eslint-disable-line no-underscore-dangle
    const expected = '<:code monkey:790612474290110505> : Code Monkey\n🔥: Keeb';

    expect(removeRoleHeader(roleMessage)).toEqual(expected);

    expect(removeRoleHeader('this is just another message')).toEqual('');
    expect(removeRoleHeader('')).toEqual('');

    expect(removeRoleHeader('this is a test with multiple new lines\n\nbody part1.\n\nbody part2.')).toEqual('body part1.\n\nbody part2.');
    expect(removeRoleHeader('this is a test with trailing newline\n\nbody part1.\n\nbody part2.\n')).toEqual('body part1.\n\nbody part2.');
});
