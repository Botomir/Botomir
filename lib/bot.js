const Discord = require("discord.js");

const {botInitializer} = require("./initializer/botInitializer");
const {commandHandler} = require("./commands/botCommands");
const {scannerHandler} = require("./scanner/botScanner");
const {reactionHandler} = require("./reactions/botReactions");
const {databaseHandler} = require("./database/mongoDB");

const client = new Discord.Client();

client.once("ready", () => {
    botInitializer(client);
});

client.on("message", async message => {
    console.log("Message received: " + message.content);

    // Handle message if not from self
    if (!message.author.bot) {
        scannerHandler(message);
        commandHandler(message);
        databaseHandler(message);
    }
});

client.on("messageReactionAdd", (reaction, user) => {
    reactionHandler(reaction, user);
});

module.exports = {
    client: client,
};
