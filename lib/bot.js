// bot.js
// ======

const Discord = require("discord.js");

const {botInitializer} = require("./initializer/botInitializer");
const {commandHandler} = require("./commands/botCommands");
const {scannerHandler} = require("./scanner/botScanner");
const {addReactionHandler} = require("./reactions/botReactions");
const {removeReactionHandler} = require("./reactions/botReactions");
const {databaseHandler} = require("./database/mongoDB");

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

module.exports = {
    client: client,
};
