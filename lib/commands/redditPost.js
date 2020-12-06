// redditPost.js
// =============

let _ = require("lodash");

const {memeSubreddits, cuteSubreddits} = require("../../config.json");
const {splitStringBySpace} = require("./commandUtilities");
const {meme: reddit} = require('memejs');

module.exports = {
    redditCommand: function (message) {
        let messageArr = splitStringBySpace(message);

        (messageArr.length < 2) ? sendNoSubredditSpecified(message) : redditPost(message, messageArr[1]);
    },

    memeCommand: function (message) {
        redditPost(message, _.sample(memeSubreddits))
    },

    puppyCommand: function (message) {
        redditPost(message, "puppy");
    },

    cuteCommand: function (message) {
        redditPost(message, _.sample(cuteSubreddits));
    }
};

function redditPost(message, subreddit) {
    reddit(subreddit, function (err, data) {
        err ? console.log("Error: when calling memejs API on " + subreddit + ": ") : sendPost(message, data)}
    );
}

function sendPost(message, data) {
    message.channel.send(data.title + "\n" + data.url)
        .then(r => console.log("Successfully sent Reddit post: " + r))
        .catch(e => console.log("Error: could not send Reddit post: " + e));
}

function sendNoSubredditSpecified(message) {
    message.channel.send("Error: no subreddit specified")
        .then(r => console.log("Successfully sent no subreddit specified message: " + r))
        .catch(e => console.log("Error: could not send no subreddit specified message: " + e));
}