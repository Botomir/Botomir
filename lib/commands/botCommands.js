// botCommands.js
// ==============

const {commandPrompt, defaultCity} = require("../../config.json");
const {pingCommand} = require("./ping");
const {helpCommand} = require("./help");
const {giveRole} = require("./giveRole");
const {removeRole} = require("./removeRole");
const {redditCommand, memeCommand, puppyCommand, cuteCommand} = require("./redditPost");
const {mentalHealthCommand} = require("./mentalHealth");
const {weatherCommand} = require("./weather");
const {nicknameCommand} = require("./nickname");

module.exports = {
    commandHandler: function (message) {
        if (containsCommand(message,  "ping")) {
            pingCommand(message);
        } else if (containsCommand(message, "help")) {
            helpCommand(message, commandPrompt);
        } else if (containsCommand(message, "role")) {
            giveRole(message);
        } else if (containsCommand(message, "remove")) {
            removeRole(message);
        } else if (containsCommand(message,"reddit")) {
            redditCommand(message);
        } else if (containsCommand(message,"puppy")) {
            puppyCommand(message);
        } else if (containsCommand(message, "cute")) {
            cuteCommand(message);
        } else if (containsCommand(message,"mental-health")) {
            mentalHealthCommand(message);
        } else if (containsCommand(message,  "meme")) {
            memeCommand(message);
        } else if (containsCommand(message, "weather")) {
            weatherCommand(message, defaultCity);
        } else if (containsCommand(message, "nickname")) {
            nicknameCommand(message);
        }
    }
};

function containsCommand(message, command) {
    return message.content.toLowerCase().startsWith(commandPrompt + command);
}
