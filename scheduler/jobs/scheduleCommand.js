const source = require('rfr');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const Bot = source('bot');

const { Settings } = source('models/settings');
const { Statistics, EventTypes } = source('models/statistics');

function handleRunCommand(job) {
    const { serverID, channelID, commandName, args } = job.attrs.data;
    const { guilds, commands, user } = Bot.client;

    let guild;
    let channel;
    let command;

    new Promise(((resolve, reject) => {
        guild = guilds.cache.get(serverID);
        if (!guild) {
            return reject(new Error(`Server can not be found with id: ${serverID}`));
        }

        channel = guild.channels.cache.get(channelID);
        if (!channel) {
            return reject(new Error(`Channel can not be found in server ${serverID} with id: ${channelID}`));
        }

        command = commands.get(commandName)
                        || commands.find((c) => c.aliases && c.aliases.includes(commandName));

        if (!command) {
            return reject(new Error(`Command ${commandName} can not be found`));
        }
        return resolve(Settings.getServerSettings(serverID));
    }))
        .then((config) => {
            if (config.disabledCommands.includes(command.name)) {
                throw new Error(`command ${commandName} is dissabled on this server.`);
            }

            // a fake message to send to the command
            // this is probably a bad idea and I am open to ideas to fix this
            const message = {
                guild,
                channel,
                client: Bot.client,
                author: user,
            };

            command.execute(message, args, config);
            return new Statistics()
                .setGuild(serverID)
                .setEvent(EventTypes.COMMAND_EXECUTED)
                .setDetails(command.name)
                .save();
        })
        .catch((e) => {
            logger.error(e);
            sendMessage(channel, `Failed to run the scheduled command - '${e.message}'`);
        });
}

module.exports = function (agenda) {
    agenda.define('schedule command', handleRunCommand);
};
