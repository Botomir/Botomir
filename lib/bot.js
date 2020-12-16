// bot.js
// ======

const Discord = require("discord.js");
const source = require("rfr");

const {botInitializer} = source("lib/initializer/botInitializer");
const {commandHandler} = source("lib/commands/botCommands");
const {scannerHandler} = source("lib/scanner/botScanner");
const {addReactionHandler} = source("lib/reactions/botReactions");
const {removeReactionHandler} = source("lib/reactions/botReactions");
const {databaseHandler} = source("lib/database/mongoDB");

const client = new Discord.Client();

client.once("ready", () => {
    botInitializer(client);
});

client.on("message",  message => {
    console.log("Message received: {" + message.content + "}");

    // Handle message if not from self
    if (!message.author.bot) {
        scannerHandler(message);
        commandHandler(message);
        databaseHandler(message);
    }
});

client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.id === process.env.DISCORD_MESSAGE_ID) {
        addReactionHandler(reaction, user);
    }
});

client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.id === process.env.DISCORD_MESSAGE_ID) {
        removeReactionHandler(reaction, user);
    }
});

client.on("error", err => {
    console.log("Error: bot encountered error {" + err + "}");
    client.login(process.env.DISCORD_TOKEN).then(r => console.log("Login successful: " + r));
});

exports.client = client;
