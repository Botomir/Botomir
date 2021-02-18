const rewire = require('rewire');
const source = require('rfr');
const safe = require('safe-regex');

const util = rewire('../lib/utils/util');
const { badBotRegex, goodBotRegex } = source('./lib/scanner/botResponse');
const { spotifyTrackRegex } = source('./lib/scanner/spotify');

test('Check regex', () => {
    const discordIDRegex = util.__get__('discordIDRegex'); // eslint-disable-line no-underscore-dangle

    expect(safe(discordIDRegex)).toBe(true);
    expect(safe(badBotRegex)).toBe(true);
    expect(safe(goodBotRegex)).toBe(true);
    expect(safe(spotifyTrackRegex)).toBe(true);
});
