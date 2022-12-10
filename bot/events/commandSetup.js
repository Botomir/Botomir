const source = require('rfr');
const fs = require('fs');
const { Events, Collection } = require('discord.js');

const logger = source('bot/utils/logger');

function checkNameConflicts(categories, commandNames) {
    return categories.reduce((previous, category) => {
        if (commandNames.includes(category)) {
            logger.warn(`A command and a command category have the same name: '${category}', this will prevent help messages from loading correctly.`);
            return true;
        }

        return previous;
    }, false);
}

function setupCommands(client) {
    client.commands = new Collection();

    const commandFolders = fs.readdirSync('./bot/commands').filter((file) => !file.endsWith('.js'));

    const categories = [];
    commandFolders.forEach((folder) => {
        const commandFiles = fs.readdirSync(`./bot/commands/${folder}`).filter((file) => file.endsWith('.js'));
        categories.push(folder);

        commandFiles.forEach((file) => {
            const command = source(`bot/commands/${folder}/${file}`);
            command.category = folder;
            client.commands.set(command.name, command);
        });
    });

    // show warnings if a command and a category have the same name
    checkNameConflicts(categories, client.commands.map((c) => c.name));

    client.categories = categories;
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute: setupCommands,
};
