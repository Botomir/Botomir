const rewire = require('rewire');

const settings = rewire('../lib/commands/settingsCommands');

const roleMessage = `
Hello Welcome to the Scarborough Support Squad. This is the list of available channels, you gain access to the channels by receiving the role associated with it
React to give yourself a role.

<:code monkey:790612474290110505> : Code Monkey
🔥: Keeb`;

test('settings.parseEmoji', () => {
    const parseEmoji = settings.__get__('parseEmoji'); // eslint-disable-line no-underscore-dangle
    expect(parseEmoji('<:code monkey:790612474290110505>')).toEqual('code monkey');
    expect(parseEmoji('<:code monkey:790612474290110505> another emoji <:waggle:7901232474290110505>')).toEqual(null);
    expect(parseEmoji('🔥')).toEqual('🔥');
    // expect(parseEmoji('🔥should not match')).toEqual(null);
    expect(parseEmoji('not a match')).toEqual(null);
});

test('settings.splitStringBySpace', () => {
    const parseRoleMessage = settings.__get__('parseRoleMessage'); // eslint-disable-line no-underscore-dangle
    const expected = [{
        emoji: 'code monkey', role: 'Code Monkey',
    }, {
        emoji: '🔥', role: 'Keeb',
    }];
    expect(parseRoleMessage(roleMessage)).toEqual(expected);
});

test('settings.removeRoleHeader', () => {
    const removeRoleHeader = settings.__get__('removeRoleHeader'); // eslint-disable-line no-underscore-dangle
    const expected = '<:code monkey:790612474290110505> : Code Monkey\n🔥: Keeb';

    expect(removeRoleHeader(roleMessage)).toEqual(expected);

    expect(removeRoleHeader('this is just another message')).toEqual('');
    expect(removeRoleHeader('')).toEqual('');

    expect(removeRoleHeader('this is a test with multiple new lines\n\nbody part1.\n\nbody part2.')).toEqual('body part1.\n\nbody part2.');
    expect(removeRoleHeader('this is a test with trailing newline\n\nbody part1.\n\nbody part2.\n')).toEqual('body part1.\n\nbody part2.');
});
