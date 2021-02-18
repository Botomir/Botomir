// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

const logger = source('lib/utils/logger');

const helpEmbeded = {
    color: 0x0099ff,
    author: {
        name: 'Botomir Commands',
        icon_url: `${process.env.BASE_URL}/assets/logo.jpg`,
    },
    timestamp: new Date(),
    footer: {
        text: 'For any questions contact @Colonel Pineapple#3164',
    },
};

function helpCommand(message, args) {
    const { commands } = message.client;

    Settings.getServerSettings(message.guild.id)
        .then((config) => {
            let fields = [];
            if (args.length === 0) {
                fields = commands.map((command) => ({
                    name: command.name + (command.botAdmin ? ' - bot admin only' : ''),
                    value: command.description,
                }));
            } else {
                const command = commands.get(args[0].toLowerCase());
                if (!command) return sendMessage(message.channel, `${args[0]} is not a valid command!`);

                fields.push({
                    name: 'Name', value: command.name,
                });
                fields.push({
                    name: 'Bot Admin Only', value: command.botAdmin ? 'yes' : 'no',
                });

                if (command.aliases && command.aliases.length > 0) {
                    fields.push({
                        name: 'Aliases', value: command.aliases.join(', '),
                    });
                }
                if (command.description) {
                    fields.push({
                        name: 'Description', value: command.description,
                    });
                }
                if (command.usage) {
                    fields.push({
                        name: 'Usage', value: `${config.commandPrefix}${command.name} ${command.usage}`,
                    });
                }
            }

            helpEmbeded.fields = fields;

            return sendMessage(message.channel, {
                embed: helpEmbeded,
            });
        })
        .catch((err) => logger.log(`Something went wrong loading the server settings: ${err}`));
}

module.exports = {
    args: false,
    name: 'help',
    botAdmin: false,
    description: 'lists all the commands or info about a specific command',
    usage: '[command name]',
    aliases: ['commands'],
    execute: helpCommand,
};
