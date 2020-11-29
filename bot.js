// bot.js
// ======

require("dotenv").config();
require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const Discord = require("discord.js");

const {commandHandler} = require("./static/js/botCommands");
const {messageScanner} = require("./static/js/botMessage");
const {reactionHandler} = require("./static/js/botReactions");

const client = new Discord.Client();
const app = express();

app.set('view engine', 'ejs');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const MessagePost = mongoose.model("messages", {
    guild: String,
    channel: String,
    author: String,
    content: String,
    timestamp: Date,
    id: String
});

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

    console.log("Bot now ready!");
});

client.on('message', async message => {
    if (message.author.bot) return;
    console.log(message.content);

    // Check if message contains keywords
    await messageScanner(message);
    console.log("Successfully scanned message");

    // Check if message contains command and handle appropriately
    await commandHandler(message);
    console.log("Successfully handled message command");

    // Store messages in database
    // await storeMessageInDB(message);
    // console.log("Successfully written to database");
});

client.on('messageReactionAdd', (reaction, user) => {
    // Handle reactions to cached messages
    reactionHandler(reaction, user);
    console.log("Successfully handled reaction");
});

client.on("error", err => {
    console.log("Error: bot encountered error | " + err);
    client.login(process.env.DISCORD_TOKEN);
});

app.get("/", function (req, res) {
    res.render("<h1>Hello world!</h1>h1>");
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8300;
}

app.listen(port, function () {
    client.login(process.env.DISCORD_TOKEN);
    console.log("Server started on port " + port);
});

// Utility function to write to DB
function storeMessageInDB(message) {
    const messagePost = new MessagePost({
        guild: message.guild,
        channel: message.channel,
        author: message.author,
        content: message.content,
        timestamp: message.createdAt,
        id: message.id
    });

    messagePost.save();
}
