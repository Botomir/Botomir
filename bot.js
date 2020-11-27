require("dotenv").config();
const Discord = require("discord.js");
const CommandHandler = require("./static/js/botCommands.js");

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.once("ready", () => {
    // Notify connection ready
    console.log("Bot is connected to Discord!");

    // Notify guild connected to + num members
    client.guilds.fetch(process.env.DISCORD_GUILD_ID)
        .then(guild =>
            console.log("Connected to server: " + guild.name + ", id: " + guild.id +
                        "\nMember Count: " + guild.memberCount))
        .catch(console.error);

    // Cache message for reactions
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID).messages.fetch(process.env.DISCORD_MESSAGE_ID)
        .then(message => console.log("Cached message found: " + message))
        .catch(e => console.log("Error: cached message not found | " + e));
});

client.on('message', async message => {
    if (message.author.bot) return;

    console.log(message.content);

    if (message.content.toLowerCase().startsWith("!ping")) {
        CommandHandler.pingCommand(message);
    }

    if (message.content.toLowerCase().startsWith("!help")) {
        CommandHandler.helpCommand();
    }

    if (message.content.toLowerCase().startsWith("!role")) {
        CommandHandler.role_command(message);
    }

    if (message.content.toLowerCase().startsWith("!remove")) {
        CommandHandler.remove_command(message);
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    console.log('a reaction has been added');
});

client.on('messageReactionRemove', (reaction, user) => {
    console.log('a reaction has been removed');
});

client.on("error", err => {
    console.log("Error: bot encountered error | " + err);
    client.login(process.env.DISCORD_TOKEN);
});

client.login(process.env.DISCORD_TOKEN);
