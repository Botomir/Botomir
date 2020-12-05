// mongoDB.js
// ==========

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}).then(r => console.log("Successfully connected to MongoDB: " + r));

const MessagePost = mongoose.model("messages", {
    guild: String,
    channel: String,
    author: String,
    content: String,
    timestamp: Date,
    id: String
});

module.exports = {
    databaseHandler: function(message) {
        const messagePost = new MessagePost({
            guild: message.guild,
            channel: message.channel,
            author: message.author,
            content: message.content,
            timestamp: message.createdAt,
            id: message.id
        });

        messagePost.save().then(r => console.log("Successfully written message to data base: " + r));
    }
};
