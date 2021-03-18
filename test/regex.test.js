const rewire = require('rewire');
const source = require('rfr');
const safe = require('safe-regex');

const util = rewire('../bot/utils/util');
// const roleParsing = rewire('../bot/utils/roleParsing');

const { badBotRegex, goodBotRegex } = source('./bot/scanner/botResponse');
const { spotifyTrackRegex } = source('./bot/scanner/spotify');

test('Check regex', () => {
    const discordIDRegex = util.__get__('discordIDRegex'); // eslint-disable-line no-underscore-dangle
    // const roleRegex = roleParsing.__get__('roleRegex');

    // expect(safe(roleRegex)).toBe(true);
    expect(safe(discordIDRegex)).toBe(true);
    expect(safe(badBotRegex)).toBe(true);
    expect(safe(goodBotRegex)).toBe(true);
    expect(safe(spotifyTrackRegex)).toBe(true);
});
