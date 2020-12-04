// botCommands.js
// ==============

const {pingCommand} = require("./ping");
const {helpCommand} = require("./help");
const {giveRole} = require("./giveRole");
const {removeRole} = require("./removeRole");
const {memeCommand, puppyCommand} = require("./redditPost");
const {mentalHealthCommand} = require("./mentalHealth");
const {weatherCommand} = require("./weather");

const botCommand = "!";
const defaultCity = "Toronto, ON";

module.exports = {
    commandHandler: function (message) {
        if (containsCommand(message,  "ping")) {
            pingCommand(message);
        } else if (containsCommand(message, "help")) {
            helpCommand(message, botCommand);
        } else if (containsCommand(message, "role")) {
            giveRole(message);
        } else if (containsCommand(message, "remove")) {
            removeRole(message);
        } else if (containsCommand(message,"puppy")) {
            puppyCommand(message);
        } else if (containsCommand(message,"mental-health")) {
            mentalHealthCommand(message);
        } else if (containsCommand(message,  "meme")) {
            memeCommand(message);
        } else if (containsCommand(message, "weather")) {
            weatherCommand(message, defaultCity);
        }
    }
};

function containsCommand(message, command) {
    return message.content.toLowerCase().startsWith(botCommand + command);
}
