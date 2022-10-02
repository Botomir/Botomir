const { Client, Intents } = require('discord.js');
const fs = require('fs');

const source = require('rfr');

const { sendEventMessage } = source('bot/utils/util');

const logger = source('bot/utils/logger');

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.MESSAGE_CONTENT,
    ],
});

// setup event handlers
const eventFiles = fs.readdirSync('./bot/events').filter((file) => file.endsWith('.js'));

eventFiles.forEach((file) => {
    const event = source(`bot/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => {
            logger.silly(`event ${event.name} is being handled`, ...args);
            event.execute(...args, client);
        });
    } else {
        client.on(event.name, (...args) => {
            logger.silly(`event ${event.name} is being handled by ${file}`, ...args);
            event.execute(...args, client);
        });
    }
});

// joined a server
client.on('guildCreate', (guild) => {
    logger.info(`Joined a new guild: ${guild.name}`);
    sendEventMessage(client, `Botomir has joined the \`${guild.name}\` server!! We are now in ${client.guilds.cache.size} servers`);
});

// removed from a server
client.on('guildDelete', (guild) => {
    logger.info(`removed from a guild: ${guild.name}`);
    sendEventMessage(client, `Botomir has left \`${guild.name}\` :cry:  We are now in ${client.guilds.cache.size} servers`);
});

client.on('error', (err) => {
    logger.error(`bot encountered error {${err}}`);
    logger.error(err);
    sendEventMessage(client, `Oh no something went wrong!!! {${err}}`);

    logger.warn('attempting to login to discord again');
    client.login(process.env.DISCORD_TOKEN).then(() => logger.info('Login successful'));
});

exports.client = client;
