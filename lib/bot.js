// bot.js
// ======

const Discord = require('discord.js');
const source = require('rfr');

const { botInitializer } = source('lib/initializer/botInitializer');
const { commandHandler, setupCommands } = source('lib/scanner/commandHandler');
const { scannerHandler } = source('lib/scanner/botScanner');
const { databaseHandler } = source('lib/scanner/messageLogger');
const { addReactionHandler, removeReactionHandler } = source('lib/reactions/botReactions');
const logger = source('lib/utils/logger');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
    botInitializer(client);
    setupCommands(client);
});

client.on('message', (message) => {
    logger.log(`Message received: {${message.content}}`);

    // Handle message if not from self
    if (!message.author.bot) {
        scannerHandler(message);
        commandHandler(message);
        databaseHandler(message);
    }
});

// joined a server
client.on('guildCreate', (guild) => {
    logger.log(`Joined a new guild: ${guild.name}`);
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.partial) {
        try {
            reaction.message.fetch();
        } catch (error) {
            return;
        }
    }

    addReactionHandler(reaction, user);
});

client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.partial) {
        try {
            reaction.message.fetch();
        } catch (error) {
            return;
        }
    }

    removeReactionHandler(reaction, user);
});

client.on('error', (err) => {
    logger.log(`Error: bot encountered error {${err}}`);
    client.login(process.env.DISCORD_TOKEN).then((r) => logger.log(`Login successful: ${r}`));
});

exports.client = client;
