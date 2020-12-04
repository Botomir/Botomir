// botCommands.js
// ==============

const {pingCommand} = require("./commands/ping");
const {helpCommand} = require("./commands/help");
const {giveRole} = require("./commands/giveRole");
const {removeRole} = require("./commands/removeRole");
const {memeCommand, puppyCommand} = require("./commands/redditPost");
const {mentalHealthCommand} = require("./commands/mentalHealth");
const {weatherCommand} = require("./commands/weather");

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
