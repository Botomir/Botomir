// botCommands.js
// ==============

const {pingCommand} = require("./ping");
const {helpCommand} = require("./help");
const {giveRole} = require("./giveRole");
const {removeRole} = require("./removeRole");
const {memeCommand, puppyCommand, cuteCommand} = require("./redditPost");
const {mentalHealthCommand} = require("./mentalHealth");
const {weatherCommand} = require("./weather");
const {nicknameCommand} = require("./nickname");
let config = require("../../config.json");

module.exports = {
    commandHandler: function (message) {
        if (containsCommand(message,  "ping")) {
            pingCommand(message);
        } else if (containsCommand(message, "help")) {
            helpCommand(message, config.commandPrompt);
        } else if (containsCommand(message, "role")) {
            giveRole(message);
        } else if (containsCommand(message, "remove")) {
            removeRole(message);
        } else if (containsCommand(message,"puppy")) {
            puppyCommand(message);
        } else if (containsCommand(message, "cute")) {
            cuteCommand(message);
        } else if (containsCommand(message,"mental-health")) {
            mentalHealthCommand(message);
        } else if (containsCommand(message,  "meme")) {
            memeCommand(message);
        } else if (containsCommand(message, "weather")) {
            weatherCommand(message, config.defaultCity);
        } else if (containsCommand(message, "nickname")) {
            nicknameCommand(message);
        }
    }
};

function containsCommand(message, command) {
    return message.content.toLowerCase().startsWith(config.commandPrompt + command);
}
