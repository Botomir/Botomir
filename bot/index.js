const Discord = require('discord.js');
const source = require('rfr');

const { botInitializer } = source('bot/initializer/botInitializer');
const { setupCommands } = source('bot/commands');
const { commandHandler } = source('bot/scanner/commandHandler');

const { scannerHandler } = source('bot/scanner/botScanner');
const { databaseHandler } = source('bot/scanner/messageLogger');
const { messageLink } = source('bot/scanner/messageLinks');
const { addReactionHandler, removeReactionHandler } = source('bot/reactions/botReactions');
const logger = source('bot/utils/logger');
const { sendMessage, sendEventMessage } = source('bot/utils/util');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
    botInitializer(client);
    setupCommands(client);
});

client.on('message', (message) => {
    if (message.guild === null) {
        logger.warn('message received in a DM');
        if (!message.author.bot) sendMessage(message.channel, 'This bot can only be used in servers, not DM\'s');
        return;
    }
    logger.silly(`Message received in '${message.guild.name}': [${message.content}]`);

    // Handle message if not from self
    if (!message.author.bot) {
        scannerHandler(message);
        messageLink(message);
        commandHandler(message);
        databaseHandler(message);
    }
});

// joined a server
client.on('guildCreate', (guild) => {
    logger.info(`Joined a new guild: ${guild.name}`);
    sendEventMessage(client, `Botomir has joined the \`${guild.name}\` guild!! We are now in ${client.guilds.cache.size} guilds`);
});

// removed from a server
client.on('guildDelete', (guild) => {
    logger.info(`removed from a guild: ${guild.name}`);
    sendEventMessage(client, `Botomir has left \`${guild.name}\` :cry:  We are now in ${client.guilds.cache.size} guilds`);
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.guild === null) {
        logger.warn('reaction received in a DM');
        return;
    }

    if (!user.bot) addReactionHandler(reaction, user);
});

client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.guild === null) {
        logger.warn('reaction received in a DM');
        return;
    }

    if (!user.bot) removeReactionHandler(reaction, user);
});

client.on('error', (err) => {
    logger.error(`bot encountered error {${err}}`);
    logger.error(err);
    sendEventMessage(client, `Oh no something went wrong!!! {${err}}`);

    logger.warn('attempting to login to discord again');
    client.login(process.env.DISCORD_TOKEN).then(() => logger.info('Login successful'));
});

exports.client = client;
