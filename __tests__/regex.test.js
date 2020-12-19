const rewire = require('rewire');
const source = require('rfr');
const safe = require('safe-regex');

const commandUtilities = rewire('../lib/commands/commandUtilities');
const { badBotRegex } = source('./lib/scanner/badBot');
const { goodBotRegex } = source('./lib/scanner/goodBot');
const { spotifyTrackRegex } = source('./lib/scanner/spotify');

test('Check regex', () => {
    const discordIDRegex = commandUtilities.__get__('discordIDRegex'); // eslint-disable-line no-underscore-dangle

    expect(safe(discordIDRegex)).toBe(true);
    expect(safe(badBotRegex)).toBe(true);
    expect(safe(goodBotRegex)).toBe(true);
    expect(safe(spotifyTrackRegex)).toBe(true);
});
