const Discord = require('discord.js');
const source = require('rfr');

const { botInitializer } = source('lib/initializer/botInitializer');
const { commandHandler, setupCommands } = source('lib/scanner/commandHandler');
const { scannerHandler } = source('lib/scanner/botScanner');
const { databaseHandler } = source('lib/scanner/messageLogger');
const { addReactionHandler, removeReactionHandler } = source('lib/reactions/botReactions');
const logger = source('lib/utils/logger');
const { sendMessage } = source('lib/utils/util');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
    botInitializer(client);
    setupCommands(client);
});

client.on('message', (message) => {
    logger.silly(`Message received in '${message.guild.name}': [${message.content}]`);

    if (message.type === 'dm') {
        logger.warn('message recieved in a DM');
        return sendMessage(message.channel, 'This bot can only be used in servers, not DM\'s');
    }

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

    if (reaction.message.type === 'dm') return logger.warn('reaction recieved in a DM');

    if (!user.bot) addReactionHandler(reaction, user);
});

client.on('messageReactionRemove', (reaction, user) => {

    if (reaction.message.type === 'dm') return logger.warn('reaction recieved in a DM');

    if (!user.bot) removeReactionHandler(reaction, user);
});

client.on('error', (err) => {
    logger.error(`bot encountered error {${err}}`);
    logger.error(err);
    logger.warn('attempting to login to discord again');
    client.login(process.env.DISCORD_TOKEN).then(() => logger.info('Login successful'));
});

exports.client = client;
