const Discord = require('discord.js');
const fs = require('fs');

const source = require('rfr');

const { sendEventMessage } = source('bot/utils/util');

const logger = source('bot/utils/logger');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// setup event handlers
const eventFiles = fs.readdirSync('./bot/events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = source(`bot/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => {
            logger.silly(`event ${event.name} is being handled`, ...args);
            event.execute(...args, client);
        });
    } else {
        client.on(event.name, (...args) => {
            logger.silly(`event ${event.name} is being handled`, ...args);
            event.execute(...args, client);
        });
    }
}

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

client.on('error', (err) => {
    logger.error(`bot encountered error {${err}}`);
    logger.error(err);
    sendEventMessage(client, `Oh no something went wrong!!! {${err}}`);

    logger.warn('attempting to login to discord again');
    client.login(process.env.DISCORD_TOKEN).then(() => logger.info('Login successful'));
});

exports.client = client;
