// bot.js
// ======

const Discord = require('discord.js');
const source = require('rfr');

const { botInitializer } = source('lib/initializer/botInitializer');
const { commandHandler } = source('lib/commands/botCommands');
const { scannerHandler } = source('lib/scanner/botScanner');
const { databaseHandler } = source('lib/scanner/messageLogger');
const { addReactionHandler, removeReactionHandler } = source('lib/reactions/botReactions');
const logger = source('lib/utils/logger');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
    botInitializer(client);
});

client.on('message', (message) => {
    logger.silly(`Message received: {${message.content}}`);

    // Handle message if not from self
    if (!message.author.bot) {
        scannerHandler(message);
        commandHandler(message);
        databaseHandler(message);
    }
});

// joined a server
client.on('guildCreate', (guild) => {
    logger.info(`Joined a new guild: ${guild.name}`);
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.partial) {
        try {
            reaction.message.fetch();
        } catch (error) {
            logger.error(error);
            logger.error('failed to fetch message');
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
            logger.error(error);
            logger.error('failed to fetch message');
            return;
        }
    }

    removeReactionHandler(reaction, user);
});

client.on('error', (err) => {
    logger.error(`bot encountered error {${err}}`);
    logger.warn('attempting to login to discord again');
    client.login(process.env.DISCORD_TOKEN).then(() => logger.info('Login successful'));
});

exports.client = client;
