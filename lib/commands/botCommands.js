// botCommands.js
// ==============

const source = require('rfr');

const { pingCommand } = source('lib/commands/ping');
const { helpCommand } = source('lib/commands/help');
const { changeRoleCommand } = source('lib/commands/changeRole');
const { redditCommand, memeCommand, puppyCommand, cuteCommand } = source('lib/commands/redditPost');
const { mentalHealthCommand } = source('lib/commands/mentalHealth');
const { weatherCommand } = source('lib/commands/weather');
const { nicknameCommand } = source('lib/commands/nickname');
const { generatePlaylistCommand, authenticateSpotify } = source('lib/commands/spotify');
const logger = source('lib/utils/logger');
const { loadSettings } = source('lib/database/mongoDB');

function containsCommand(message, commandPrompt, command) {
    return message.content.toLowerCase().startsWith(commandPrompt + command);
}

function commandHandler(message) {
    loadSettings(message.guild.id)
        .then((config) => {
            const commandPrompt = config.command_prefix;

            if (containsCommand(message, commandPrompt, 'ping')) {
                pingCommand(message);
            } else if (containsCommand(message, commandPrompt, 'help')) {
                helpCommand(message, commandPrompt);
            } else if (containsCommand(message, commandPrompt, 'role')) {
                changeRoleCommand(message, 'add');
            } else if (containsCommand(message, commandPrompt, 'remove')) {
                changeRoleCommand(message, 'remove');
            } else if (containsCommand(message, commandPrompt, 'reddit')) {
                redditCommand(message);
            } else if (containsCommand(message, commandPrompt, 'puppy')) {
                puppyCommand(message);
            } else if (containsCommand(message, commandPrompt, 'cute')) {
                cuteCommand(message);
            } else if (containsCommand(message, commandPrompt, 'mental-health')) {
                mentalHealthCommand(message);
            } else if (containsCommand(message, commandPrompt, 'meme')) {
                memeCommand(message);
            } else if (containsCommand(message, commandPrompt, 'weather')) {
                weatherCommand(message);
            } else if (containsCommand(message, commandPrompt, 'nickname')) {
                nicknameCommand(message);
            } else if (containsCommand(message, commandPrompt, 'createplaylist')) {
                generatePlaylistCommand(message);
            } else if (containsCommand(message, commandPrompt, 'authspotify')) {
                authenticateSpotify(message);
            }
        })
        .catch((err) => {
            logger.log(`Something went wrong loading the server settings: ${err}`);
        });
}

exports.commandHandler = commandHandler;
