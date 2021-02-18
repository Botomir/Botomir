// botCommands.js
// ==============

const source = require('rfr');
const fs = require('fs');
const Discord = require('discord.js');

const { Settings } = source('lib/database/models/settings');
const { sendMessage } = source('lib/utils/util');
const { findRole } = source('lib/roles/roles');
const logger = source('lib/utils/logger');

function setupCommands(client) {
    client.commands = new Discord.Collection();

    const commandFolders = fs.readdirSync('./lib/commands');

    commandFolders.forEach((folder) => {
        const commandFiles = fs.readdirSync(`./lib/commands/${folder}`).filter((file) => file.endsWith('.js'));

        commandFiles.forEach((file) => {
            const command = source(`lib/commands/${folder}/${file}`);
            client.commands.set(command.name, command);

            if (command.aliases) {
                command.aliases.forEach((alias) => client.commands.set(alias, command));
            }
        });
    });
}

function commandHandler(message) {
    const { commands } = message.client;
    Settings.getServerSettings(message.guild.id)
        .then((config) => {
            const prefix = config.commandPrefix;
            if (!message.content.startsWith(prefix) || message.author.bot) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = commands.get(commandName);

            if (!command) throw new Error(`command ${commandName} does not exist.`);

            if (command.args && args.length < command.args) {
                let reply = `You didn't provide enough arguments, ${message.author}!`;

                if (command.usage) {
                    reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
                }

                sendMessage(message.channel, reply);
            }

            if (command.botAdmin && !findRole(message.member, config.botAdminRole)) {
                const reply = `You must have the ${config.botAdminRole} to use this command!`;
                sendMessage(message.channel, reply);
            }

            command.execute(message, args);
        })
        .catch((err) => {
            logger.log(`Something went wrong loading the server settings: ${err}`);
            sendMessage(message.channel, 'there was an error trying to execute that command!');
        });
}

module.exports = {
    setupCommands,
    commandHandler,
};
