const source = require('rfr');

const { Settings } = source('models/settings');
const { sendMessage } = source('bot/utils/util');
const { Statistics, EventTypes } = source('models/statistics');

const logger = source('bot/utils/logger');

function commandHandler(message) {
    if (message.guild === null || message.author.bot) return;

    const { commands } = message.client;
    Settings.getServerSettings(message.guild.id)
        .then((config) => {
            const prefix = config.commandPrefix;
            if (!message.content.startsWith(prefix)) return null;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            // do nothing if there is no command
            if (commandName === '') return null;

            const command = commands.get(commandName)
                            || commands.find((c) => c.aliases && c.aliases.includes(commandName));

            if (!command) throw new Error(`command ${commandName} does not exist.`);

            if (config.disabledCommands.includes(command.name)) {
                return sendMessage(message.channel, `${commandName} is not allowed on this server, `
                            + 'contact one of the server admins if you think this is a mistake.');
            }

            if (command.args && args.length < command.args) {
                let reply = `You didn't provide enough arguments, ${message.author}!`;

                if (command.usage) {
                    reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
                }

                return sendMessage(message.channel, reply);
            }

            const roleNames = message.member.roles.cache.map((r) => r.name);

            if (command.botAdmin && !roleNames.includes(config.botAdminRole)) {
                const reply = `You must have the ${config.botAdminRole} to use this command!`;
                return sendMessage(message.channel, reply);
            }

            command.execute(message, args, config);
            return new Statistics()
                .setGuild(message.guild.id)
                .setEvent(EventTypes.COMMAND_EXECUTED)
                .setDetails(command.name)
                .save();
        })
        .catch((err) => {
            logger.error('There was an error trying to run the command');
            logger.error(err);
            sendMessage(message.channel, 'there was an error trying to execute that command!');
        });
}

module.exports = {
    name: 'message',
    once: false,
    execute: commandHandler,
};
