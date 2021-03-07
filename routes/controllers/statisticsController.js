const source = require('rfr');

const Bot = source('lib/bot');

const { Statistics, EventTypes } = source('lib/database/models/statistics');
const { Message } = source('lib/database/models/message');
const { Role } = source('lib/database/models/role');
const { Song } = source('lib/database/models/song');

const logger = source('lib/utils/logger');

const StatisticsController = {
    get(req, res) {
        Promise.all([
            Statistics.totalEvents(EventTypes.COMMAND_EXECUTED), // 0
            Statistics.totalEvents(EventTypes.GOOD_BOT), // 1
            Statistics.totalEvents(EventTypes.BAD_BOT), // 2
            Statistics.totalEvents(EventTypes.PLAYLIST_CREATED), // 3
            Statistics.totalEvents(EventTypes.ROLE_ASSIGNED), // 4
            Message.count(), // 5
            Role.count(), // 6
            Song.count(), // 7
        ]).then((values) => {
            res.render('statistics', {
                numServer: Bot.client.guilds.cache.size,
                numCommands: Bot.client.commands.size,
                commandsRun: values[0].count,
                messages: values[5].count,
                numRoles: values[6].count,
                rolesAssigned: values[4].count,
                numSongs: values[7].count,
                numPlaylists: values[3].count,
                goodBot: values[1].count,
                badBot: values[2].count,
            });
        })
            .catch((e) => logger.error('failed to generate the statistics page', e));
    },
};

module.exports = StatisticsController;
