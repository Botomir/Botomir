require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Bot is connected to Discord!");

    client.guilds.fetch(process.env.DISCORD_GUILD_ID)
        .then(guild =>
            console.log("Connected to server: " + guild.name + ", id: " + guild.id +
                        "\nMember Count: " + guild.memberCount))
        .catch(console.error);
});

client.on('message', message => {
    if (message.author.bot) return;

    console.log(message.content);

    if (message.content === "!ping") {
        pingCommand(message);
    }

    if (message.content.toLowerCase.startsWith("!role")) {
        role_command(message);
    }

    if (message.content.toLowerCase.startsWith("!remove")) {
    }
});

client.on("error", err => {
    console.log("Error: bot encountered error | " + err);
    client.login(process.env.DISCORD_TOKEN);
});

client.login(process.env.DISCORD_TOKEN);
