// redditPost.js
// =============

let _ = require("lodash");

const {splitStringBySpace} = require("./commandUtilities");
const {meme: reddit} = require('memejs');
const config = require("../../config.json");
let defaultSubreddits = config.memeSubreddits;
let cuteSubreddits = config.cuteSubreddits;

module.exports = {
    memeCommand: function (message) {
        let messageArr = splitStringBySpace(message);

        (messageArr.length === 2) ? redditPost(message, messageArr[1]) : redditPost(message, _.sample(defaultSubreddits))
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
        .then(r => "Successfully sent Reddit post: " + r)
        .catch(e => "Error: could not send Reddit post: " + e);
}