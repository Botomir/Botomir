// bot.js
// ======

const Discord = require('discord.js');
const source = require('rfr');

const { botInitializer } = source('lib/initializer/botInitializer');
const { commandHandler } = source('lib/commands/botCommands');
const { scannerHandler } = source('lib/scanner/botScanner');
const { addReactionHandler, removeReactionHandler } = source('lib/reactions/botReactions');
const { databaseHandler, storeDefaultSettings } = source('lib/database/mongoDB');
const logger = source('lib/utils/logger');

const client = new Discord.Client();

client.once('ready', () => {
    botInitializer(client);
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
    storeDefaultSettings(guild.id);
});

client.on('messageReactionAdd', (reaction, user) => {
    addReactionHandler(reaction, user);
});

client.on('messageReactionRemove', (reaction, user) => {
    removeReactionHandler(reaction, user);
});

client.on('error', (err) => {
    logger.log(`Error: bot encountered error {${err}}`);
    client.login(process.env.DISCORD_TOKEN).then((r) => logger.log(`Login successful: ${r}`));
});

exports.client = client;
