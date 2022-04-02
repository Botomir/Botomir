/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');
require('jest-extended');

const { Settings } = source('models/settings');

const fields = {
    guild: '788091112476770353',
    channel: '793573047550345237',
    user: '356984848574971914',
    message: '827754923844042802',
    content: 'this is an amazing bot',
};

describe('settings database', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('Create and save settings', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        expect(settings._mongoId).toBeDefined();
        const saved = await settings.save();

        expect(saved._mongoId).toBeDefined();
        expect(saved.guildID).toBe(fields.guild);
    });

    test('case insensitive temperature unit', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTempUnit('c');

        const saved = await settings.save();
        expect(saved.tempUnit).toBe('C');
    });

    test('invalid temperature unit', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTempUnit('L');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('full temperature unit name', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTempUnit('Celsius');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('empty command prefix', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setCommandPrefix('');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('longer prefix', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setCommandPrefix('-__-');

        const saved = await settings.save();
        expect(saved.commandPrefix).toBe('-__-');
    });

    test('missing guild', () => {
        const settings = new Settings();

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - guild name', () => {
        const settings = new Settings()
            .setGuild('bot testing');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - id too long', () => {
        const settings = new Settings()
            .setGuild('788091112476770353788091112476770353');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid guild - object', () => {
        const settings = new Settings()
            .setGuild({
                id: '1234',
            });

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid music channel - channel name', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setMusicChannel('bot-channel');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid music channel - id too long', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setMusicChannel('793573047550345237793573047550345237');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid music channel - object', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setMusicChannel({
                id: '1234',
            });

        const saved = await settings.save();
        expect(saved.musicChannelID).toBeUndefined();
    });

    test('invalid audit channel - channel name', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setAuditChannel('bot-channel');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid audit channel - id too long', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setAuditChannel('793573047550345237793573047550345237');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid audit channel - object', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setAuditChannel({
                id: '1234',
            });

        const saved = await settings.save();
        expect(saved.auditChannel).toBeUndefined();
    });

    test('invalid timezone - America/Guelph', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTimezone('America/Guelph');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });

    test('invalid timezone - Toronto', () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTimezone('Toronto');

        return expect(settings.save()).rejects.toThrow('validation failed');
    });
});

describe('settings default values', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    test('default admin role', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.botAdminRole).toBe('botomir-admin');
    });

    test('default weather location', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.weatherLocation).toBe('Toronto, ON');
    });

    test('default temp unit', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.tempUnit).toBe('C');
    });

    test('default timezone', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.timezone).toBe('America/Toronto');
    });

    test('default playlist description', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.playlistDescription)
            .toBe('A playlist that contains all the songs that the discord group posted in the last little while.');
    });

    test('default playlist name', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.playlistName).toBe('Awesome Discord Group Playlist');
    });

    test('default command prefix', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.commandPrefix).toBe('!');
    });

    test('default music channel', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.musicChannelID).toBeUndefined();
    });

    test('default audit channel', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.auditChannel).toBeUndefined();
    });

    test('default disabled commands', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.disabledCommands).toHaveLength(0);
    });

    test('default unassignable roles', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.unassignableRoles).toHaveLength(0);
    });

    test('default meme subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.memeSubs).toIncludeSameMembers([
            'dankmemes',
            'memes',
            'HistoryMemes',
            'wholesomememes',
            'onlywholesomememes',
            'prequelmemes',
            'OTmemes',
            'sequelmemes',
            'bikinibottomtwitter',
            '2meirl4meirl',
            'meirl',
            'me_irl',
            'anime_irl',
            'MEOW_IRL',
            'woof_irl',
            'dankchristianmemes',
            'deepfriedmemes',
            'MemeEconomy',
        ]);
    });

    test('default cute subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.cuteSubs).toIncludeSameMembers([
            'aww',
            'awwducational',
            'animalsbeingderps',
            'animalssmiling',
            'eyebleach',
            'babyelephantgifs',
            'bearcubgifs',
            'babyrhinogifs',
            'delightfullyannoyed',
            'otters',
            'startledcats',
            'floof',
            'rarepuppers',
            'NatureIsFuckingLit',
        ]);
    });

    test('default mental health links ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild);

        const saved = await settings.save();
        expect(saved.mentalHealth).toIncludeSameMembers([
            {
                name: 'Mental Health Resources',
                url: 'https://www.ccmhs-ccsms.ca/mental-health-resources-1',
            },
            {
                name: 'Mental Health Services',
                url: 'https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html',
            },
            {
                name: 'Information on mental illnesses, disorders and diseases',
                url: 'https://www.canada.ca/en/public-health/topics/mental-illness.html',
            },
            {
                name: 'About suicide, prevention, risk factors, how to get help when you or someone you know is in need',
                url: 'https://www.canada.ca/en/public-health/services/suicide-prevention.html',
            },
            {
                name: 'Information on mental health and ways to improve it at work and in your daily life',
                url: 'https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html',
            },
        ]);
    });
});

describe('settings inital values', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    test('custom admin role', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setAdminRole('the-best-role');

        const saved = await settings.save();
        expect(saved.botAdminRole).toBe('the-best-role');
    });

    test('custom weather location', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setWeatherLocation('Guelph, ON');

        const saved = await settings.save();
        expect(saved.weatherLocation).toBe('Guelph, ON');
    });

    test('custom temp unit', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTempUnit('F');

        const saved = await settings.save();
        expect(saved.tempUnit).toBe('F');
    });

    test('custom playlist description', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setPlaylistDescription('A description');

        const saved = await settings.save();
        expect(saved.playlistDescription).toBe('A description');
    });

    test('custom playlist name', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setPlaylistName('a cool playlist');

        const saved = await settings.save();
        expect(saved.playlistName).toBe('a cool playlist');
    });

    test('custom command prefix', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setCommandPrefix('+');

        const saved = await settings.save();
        expect(saved.commandPrefix).toBe('+');
    });

    test('custom music channel', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setMusicChannel(fields.channel);

        const saved = await settings.save();
        expect(saved.musicChannelID).toBe(fields.channel);
    });

    test('custom audit channel', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setAuditChannel(fields.channel);

        const saved = await settings.save();
        expect(saved.auditChannel).toBe(fields.channel);
    });

    test('custom mental health links ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setMentalHealthLinks([
                {
                    name: 'marshall',
                    url: 'https://marshall.ca',
                },
                {
                    name: 'google',
                    url: 'https://google.ca',
                },
            ]);

        const saved = await settings.save();
        expect(saved.mentalHealth).toIncludeSameMembers([
            {
                name: 'marshall',
                url: 'https://marshall.ca',
            },
            {
                name: 'google',
                url: 'https://google.ca',
            },
        ]);
    });

    test('custom timezone - America/Vancouver', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTimezone('America/Vancouver');

        const saved = await settings.save();
        expect(saved.timezone).toBe('America/Vancouver');
    });

    test('custom timezone - lowercase', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTimezone('america/vancouver');

        const saved = await settings.save();
        expect(saved.timezone).toBe('america/vancouver');
    });

    test('custom timezone - EST', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .setTimezone('EST');

        const saved = await settings.save();
        expect(saved.timezone).toBe('EST');
    });
});

describe('enable / dissable commands', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('enable command when none disabled', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .enableCommand('abc');

        const saved = await settings.save();
        expect(saved.disabledCommands).toHaveLength(0);
    });

    test('disable one command', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .disableCommand('abc');

        const saved = await settings.save();
        expect(saved.disabledCommands).toIncludeSameMembers(['abc']);
    });

    test('disable multiple command', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .disableCommand('abc')
            .disableCommand('def');

        const saved = await settings.save();
        expect(saved.disabledCommands).toIncludeSameMembers(['abc', 'def']);
    });

    test('enable command', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .disableCommand('abc')
            .disableCommand('def');

        const saved = await settings.save();
        expect(saved.disabledCommands).toIncludeSameMembers(['abc', 'def']);

        const saved2 = await saved.enableCommand('abc').save();
        expect(saved2.disabledCommands).toIncludeSameMembers(['def']);
    });

    test('enable multiple commands', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .disableCommand('abc')
            .disableCommand('def');

        const saved = await settings.save();
        expect(saved.disabledCommands).toIncludeSameMembers(['abc', 'def']);

        const saved2 = await saved.enableCommand('abc').enableCommand('def').save();
        expect(saved2.disabledCommands).toHaveLength(0);
    });

    test('disable already disabled command', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .disableCommand('abc')
            .disableCommand('abc');

        const saved = await settings.save();
        expect(saved.disabledCommands).toIncludeSameMembers(['abc']);
    });
});

describe('settable / unsettable roles', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('make role assinable when none are unassignable', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .removeUnassignable('role1');

        const saved = await settings.save();
        expect(saved.unassignableRoles).toHaveLength(0);
    });

    test('make one role unassignable', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addUnassignable('role1');

        const saved = await settings.save();
        expect(saved.unassignableRoles).toIncludeSameMembers(['role1']);
    });

    test('make multiple roles unassignable', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addUnassignable('role1')
            .addUnassignable('role2');

        const saved = await settings.save();
        expect(saved.unassignableRoles).toIncludeSameMembers(['role1', 'role2']);
    });

    test('make role assignable ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addUnassignable('role1')
            .addUnassignable('role2');

        const saved = await settings.save();
        expect(saved.unassignableRoles).toIncludeSameMembers(['role1', 'role2']);

        const saved2 = await settings.removeUnassignable('role1').save();
        expect(saved2.unassignableRoles).toIncludeSameMembers(['role2']);
    });

    test('make multiple role assignable ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addUnassignable('role1')
            .addUnassignable('role2');

        const saved = await settings.save();
        expect(saved.unassignableRoles).toIncludeSameMembers(['role1', 'role2']);

        const saved2 = await settings.removeUnassignable('role1').save();
        expect(saved2.unassignableRoles).toIncludeSameMembers(['role2']);
    });

    test('make already unassignable role unassignable', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addUnassignable('role1')
            .addUnassignable('role1');

        const saved = await settings.save();
        expect(saved.unassignableRoles).toIncludeSameMembers(['role1']);
    });
});

describe('add / remove meme subreddit', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('add custom meme subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addMemeSub('programershummer');

        const saved = await settings.save();
        expect(saved.memeSubs).toIncludeSameMembers([
            'dankmemes',
            'memes',
            'HistoryMemes',
            'wholesomememes',
            'onlywholesomememes',
            'prequelmemes',
            'OTmemes',
            'sequelmemes',
            'bikinibottomtwitter',
            '2meirl4meirl',
            'meirl',
            'me_irl',
            'anime_irl',
            'MEOW_IRL',
            'woof_irl',
            'dankchristianmemes',
            'deepfriedmemes',
            'MemeEconomy',
            'programershummer',
        ]);
    });

    test('add multiple custom meme subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addMemeSub('programershummer')
            .addMemeSub('meeemzzz');

        const saved = await settings.save();
        expect(saved.memeSubs).toIncludeSameMembers([
            'dankmemes',
            'memes',
            'HistoryMemes',
            'wholesomememes',
            'onlywholesomememes',
            'prequelmemes',
            'OTmemes',
            'sequelmemes',
            'bikinibottomtwitter',
            '2meirl4meirl',
            'meirl',
            'me_irl',
            'anime_irl',
            'MEOW_IRL',
            'woof_irl',
            'dankchristianmemes',
            'deepfriedmemes',
            'MemeEconomy',
            'programershummer',
            'meeemzzz',
        ]);
    });

    test('remove meme subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .removeMemeSub('prequelmemes');

        const saved = await settings.save();
        expect(saved.memeSubs).toIncludeSameMembers([
            'dankmemes',
            'memes',
            'HistoryMemes',
            'wholesomememes',
            'onlywholesomememes',
            'OTmemes',
            'sequelmemes',
            'bikinibottomtwitter',
            '2meirl4meirl',
            'meirl',
            'me_irl',
            'anime_irl',
            'MEOW_IRL',
            'woof_irl',
            'dankchristianmemes',
            'deepfriedmemes',
            'MemeEconomy',
        ]);
    });

    test('remove multiple meme subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .removeMemeSub('prequelmemes')
            .removeMemeSub('dankmemes');

        const saved = await settings.save();
        expect(saved.memeSubs).toIncludeSameMembers([
            'memes',
            'HistoryMemes',
            'wholesomememes',
            'onlywholesomememes',
            'OTmemes',
            'sequelmemes',
            'bikinibottomtwitter',
            '2meirl4meirl',
            'meirl',
            'me_irl',
            'anime_irl',
            'MEOW_IRL',
            'woof_irl',
            'dankchristianmemes',
            'deepfriedmemes',
            'MemeEconomy',
        ]);
    });

    test('remove none existant subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .removeMemeSub('abcde');

        const saved = await settings.save();
        expect(saved.memeSubs).toIncludeSameMembers([
            'dankmemes',
            'memes',
            'HistoryMemes',
            'wholesomememes',
            'onlywholesomememes',
            'OTmemes',
            'sequelmemes',
            'bikinibottomtwitter',
            '2meirl4meirl',
            'meirl',
            'me_irl',
            'anime_irl',
            'MEOW_IRL',
            'woof_irl',
            'dankchristianmemes',
            'deepfriedmemes',
            'MemeEconomy',
            'prequelmemes',
        ]);
    });

    test('add already existant subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addMemeSub('memes');

        const saved = await settings.save();
        expect(saved.memeSubs).toIncludeSameMembers([
            'dankmemes',
            'memes',
            'HistoryMemes',
            'wholesomememes',
            'onlywholesomememes',
            'OTmemes',
            'sequelmemes',
            'bikinibottomtwitter',
            '2meirl4meirl',
            'meirl',
            'me_irl',
            'anime_irl',
            'MEOW_IRL',
            'woof_irl',
            'dankchristianmemes',
            'deepfriedmemes',
            'MemeEconomy',
            'prequelmemes',
        ]);
    });
});

describe('add / remove cute subreddit', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('add custom cute subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addCuteSub('puppy');

        const saved = await settings.save();
        expect(saved.cuteSubs).toIncludeSameMembers([
            'aww',
            'awwducational',
            'animalsbeingderps',
            'animalssmiling',
            'eyebleach',
            'babyelephantgifs',
            'bearcubgifs',
            'babyrhinogifs',
            'delightfullyannoyed',
            'otters',
            'startledcats',
            'floof',
            'rarepuppers',
            'NatureIsFuckingLit',
            'puppy',
        ]);
    });

    test('add multiple custom cute subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addCuteSub('puppy')
            .addCuteSub('kittens');

        const saved = await settings.save();
        expect(saved.cuteSubs).toIncludeSameMembers([
            'aww',
            'awwducational',
            'animalsbeingderps',
            'animalssmiling',
            'eyebleach',
            'babyelephantgifs',
            'bearcubgifs',
            'babyrhinogifs',
            'delightfullyannoyed',
            'otters',
            'startledcats',
            'floof',
            'rarepuppers',
            'NatureIsFuckingLit',
            'puppy',
            'kittens',
        ]);
    });

    test('remove cute subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .removeCuteSub('floof');

        const saved = await settings.save();
        expect(saved.cuteSubs).toIncludeSameMembers([
            'aww',
            'awwducational',
            'animalsbeingderps',
            'animalssmiling',
            'eyebleach',
            'babyelephantgifs',
            'bearcubgifs',
            'babyrhinogifs',
            'delightfullyannoyed',
            'otters',
            'startledcats',
            'rarepuppers',
            'NatureIsFuckingLit',
        ]);
    });

    test('remove multiple cute subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .removeCuteSub('floof')
            .removeCuteSub('otters');

        const saved = await settings.save();
        expect(saved.cuteSubs).toIncludeSameMembers([
            'aww',
            'awwducational',
            'animalsbeingderps',
            'animalssmiling',
            'eyebleach',
            'babyelephantgifs',
            'bearcubgifs',
            'babyrhinogifs',
            'delightfullyannoyed',
            'startledcats',
            'rarepuppers',
            'NatureIsFuckingLit',
        ]);
    });

    test('remove non existant cute subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .removeCuteSub('puppy');

        const saved = await settings.save();
        expect(saved.cuteSubs).toIncludeSameMembers([
            'aww',
            'awwducational',
            'animalsbeingderps',
            'animalssmiling',
            'eyebleach',
            'babyelephantgifs',
            'bearcubgifs',
            'babyrhinogifs',
            'delightfullyannoyed',
            'startledcats',
            'rarepuppers',
            'NatureIsFuckingLit',
            'floof',
            'otters',

        ]);
    });

    test('add already existant cute subreddits ', async () => {
        const settings = new Settings()
            .setGuild(fields.guild)
            .addCuteSub('floof');

        const saved = await settings.save();
        expect(saved.cuteSubs).toIncludeSameMembers([
            'aww',
            'awwducational',
            'animalsbeingderps',
            'animalssmiling',
            'eyebleach',
            'babyelephantgifs',
            'bearcubgifs',
            'babyrhinogifs',
            'delightfullyannoyed',
            'otters',
            'startledcats',
            'floof',
            'rarepuppers',
            'NatureIsFuckingLit',
        ]);
    });
});

describe('settings static functions', () => {
    beforeAll(() => {
        return mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(() => mongoose.connection.close());

    beforeEach(() => mongoose.connection.db.dropDatabase());

    test('get all none', async () => {
        const res = await Settings.getAll();
        expect(res).toHaveLength(0);
    });

    test('get all one', async () => {
        const settings1 = new Settings()
            .setGuild(fields.guild);

        await settings1.save();

        const res = await Settings.getAll();
        expect(res).toHaveLength(1);
        expect(res[0]).toBeInstanceOf(Settings);
    });

    test('get all multiple', async () => {
        const settings1 = new Settings()
            .setGuild(fields.guild);

        const settings2 = new Settings()
            .setGuild('698257589716123781');

        await settings1.save();
        await settings2.save();

        const res = await Settings.getAll();
        expect(res).toHaveLength(2);
        expect(res[0]).toBeInstanceOf(Settings);
        expect(res[1]).toBeInstanceOf(Settings);
    });

    test('lookup server settings none', async () => {
        const res = await Settings.getServerSettings('788091112476770353');
        expect(res).toBeInstanceOf(Settings);
        expect(res.guildID).toStrictEqual('788091112476770353');

        const res2 = await Settings.getAll();
        expect(res2).toHaveLength(1);
    });

    test('lookup server settings multiple', async () => {
        const settings1 = new Settings()
            .setGuild('788091112476770353');

        const settings2 = new Settings()
            .setGuild('698257589716123781');

        await settings1.save();
        await settings2.save();

        const res = await Settings.getServerSettings('788091112476770353');
        expect(res).toBeInstanceOf(Settings);
        expect(res.guildID).toStrictEqual('788091112476770353');

        const res2 = await Settings.getAll();
        expect(res2).toHaveLength(2);
    });
});
