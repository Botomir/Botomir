// bot.js
// ======

require("dotenv").config();
const express = require("express");
const Discord = require("discord.js");
const mongoose = require("mongoose");

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
});

client.on('message', async message => {
    if (message.author.bot) return;
    console.log(message);

    // Check if message contains keywords
    messageScanner(message);

    // Check if message contains command and handle appropriately
    commandHandler(message);

    // Store messages in database
    storeMessageInDB(message);
});

client.on('messageReactionAdd', (reaction, user) => {
    // Handle reactions to cached messages
    console.log(reaction);
    reactionHandler(reaction, user);
});

client.on("error", err => {
    console.log("Error: bot encountered error | " + err);
    client.login(process.env.DISCORD_TOKEN);
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8300;
}

app.listen(port, function () {
    client.login(process.env.DISCORD_TOKEN);
    console.log("Server started on port " + port);
});

function storeMessageInDB(message) {
    const messagePost = new MessagePost({
        guild: message.guild,
        channel: message.channel,
        author: message.author,
        content: message.content,
        timestamp: message.createdAt,
        id: message.id
    });

    console.log(messagePost);
    messagePost.save();
}
