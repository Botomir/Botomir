const rewire = require('rewire');

const roleParsing = rewire('../lib/utils/roleParsing');

const roleMessage = `
Hello Welcome to the Scarborough Support Squad. This is the list of available channels, you gain access to the channels by receiving the role associated with it
React to give yourself a role.
---
<:code_monkey:790612474290110505> : Code Monkey : crazy keyboard person
🔥 : Keeb`;

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

    const res = parseRoleMessage(roleMessage);
    expect(res).toHaveProperty('header', 'Hello Welcome to the Scarborough Support Squad. This is the list of available channels, you gain access to the channels by receiving the role associated with it\nReact to give yourself a role.');
    expect(res).toHaveProperty('mappings');

    expect(res.mappings).toHaveLength(2);

    expect(res.mappings[0]).toHaveProperty('emoji', 'code_monkey');
    expect(res.mappings[0]).toHaveProperty('roleName', 'Code Monkey');
    expect(res.mappings[0]).toHaveProperty('label', 'crazy keyboard person');

    expect(res.mappings[1]).toHaveProperty('emoji', '🔥');
    expect(res.mappings[1]).toHaveProperty('roleName', 'Keeb');
    expect(res.mappings[1]).toHaveProperty('label', 'Keeb');
});

test('roleParsing.splitHeader', () => {
    const splitHeader = roleParsing.__get__('splitHeader'); // eslint-disable-line no-underscore-dangle

    expect(splitHeader(roleMessage)).toHaveProperty('header');
    expect(splitHeader(roleMessage)).toHaveProperty('body');

    expect(splitHeader('this is just another message').body).toEqual('');
    expect(splitHeader('this is just another message').header).toEqual('this is just another message');
    expect(splitHeader('').body).toEqual('');
    expect(splitHeader('').header).toEqual('');

    expect(splitHeader('this is a test with multiple new lines\n---\nbody part1.\n\nbody part2.').header).toEqual('this is a test with multiple new lines');
    expect(splitHeader('this is a test with multiple new lines\n---\nbody part1.\n\nbody part2.').body).toEqual('body part1.\n\nbody part2.');
    expect(splitHeader('this is a test with trailing newline\n---\nbody part1.\n\nbody part2.\n').body).toEqual('body part1.\n\nbody part2.');
});
