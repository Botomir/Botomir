// redditPost.js
// =============

const {splitStringBySpace} = require("./utilityFunctions");
const {meme: reddit} = require('memejs');

const defaultSubreddit = "dankmemes";

module.exports = {
    memeCommand: function (message) {
        let messageArr = splitStringBySpace(message);

        if (messageArr.length === 2) {
            sendRedditPost(message, messageArr[1])
        } else {
            sendRedditPost(message, defaultSubreddit)
        }
    },

    puppyCommand: function (message) {
        sendRedditPost(message, "puppy");
    }
};

function sendRedditPost(message, subreddit) {
    reddit(subreddit, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            message.channel.send(data.title + "\n" + data.url)
                .then(r => "Successfully sent Reddit post - " + r)
                .catch(e => "Error: could not send Reddit post -" + e);
        }
    });
}