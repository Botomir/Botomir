const rewire = require('rewire');
const safe = require('safe-regex');

const util = rewire('../bot/utils/util');
const goodbotHandler = rewire('../bot/events/goodbotHandler');
const spotifyHandler = rewire('../bot/events/spotifyHandler');
const badbotHandler = rewire('../bot/events/badbotHandler');

test('Check regex', () => {
    const discordIDRegex = util.__get__('discordIDRegex'); // eslint-disable-line no-underscore-dangle
    const badBotRegex = badbotHandler.__get__('badBotRegex'); // eslint-disable-line no-underscore-dangle
    const goodBotRegex = goodbotHandler.__get__('goodBotRegex'); // eslint-disable-line no-underscore-dangle

    const spotifyTrackRegex = spotifyHandler.__get__('spotifyTrackRegex'); // eslint-disable-line no-underscore-dangle

    // expect(safe(roleRegex)).toBe(true);
    expect(safe(discordIDRegex)).toBe(true);
    expect(safe(badBotRegex)).toBe(true);
    expect(safe(goodBotRegex)).toBe(true);
    expect(safe(spotifyTrackRegex)).toBe(true);
});
