const source = require('rfr');
const fs = require('fs');
const Discord = require('discord.js');

function setupCommands(client) {
    client.commands = new Discord.Collection();

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

    client.categories = categories;
}

module.exports = {
    name: 'ready',
    once: true,
    execute: setupCommands,
};
