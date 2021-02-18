// botCommands.js
// ==============

const source = require('rfr');

const { pingCommand } = source('lib/commands/ping');
const { helpCommand } = source('lib/commands/help');
const { helpAdminCommand } = source('lib/commands/helpAdmin');
const { changeRoleCommand, giveRoleCommand } = source('lib/commands/changeRole');
const { redditCommand, memeCommand, puppyCommand, cuteCommand } = source('lib/commands/redditPost');
const { mentalHealthCommand } = source('lib/commands/mentalHealth');
const { weatherCommand } = source('lib/commands/weather');
const { nicknameCommand } = source('lib/commands/nickname');
const { keebCommand } = source('lib/commands/keeb');
const { generatePlaylistCommand, authenticateSpotify } = source('lib/commands/spotify');
const logger = source('lib/utils/logger');
const { findRole } = source('lib/roles/roles');
const {
    addMemeSubCommand,
    addCuteSubCommand,
    setPlaylistNameCommand,
    setPlaylistDescriptionCommand,
    setPrefixCommand,
    setRoleMessageCommand,
    addGoodBotCommand,
    addBadBotCommand,
} = source('lib/commands/settingsCommands');

const { Settings } = source('lib/database/models/settings');

function containsCommand(message, commandPrompt, command) {
    return message.content.toLowerCase().startsWith(commandPrompt + command);
}

function commandHandler(message) {
    Settings.getServerSettings(message.guild.id)
        .then((config) => {
            logger.verbose(config);
            const commandPrompt = config.commandPrefix;

            if (containsCommand(message, commandPrompt, 'ping')) {
                pingCommand(message);
            } else if (containsCommand(message, commandPrompt, 'help-admin')) {
                helpAdminCommand(message);
            } else if (containsCommand(message, commandPrompt, 'help')) {
                helpCommand(message);
            } else if (containsCommand(message, commandPrompt, 'role')) {
                changeRoleCommand(message, 'add');
            } else if (containsCommand(message, commandPrompt, 'remove')) {
                changeRoleCommand(message, 'remove');
            } else if (containsCommand(message, commandPrompt, 'give')) {
                giveRoleCommand(message, 'add');
            } else if (containsCommand(message, commandPrompt, 'revoke')) {
                giveRoleCommand(message, 'remove');
            } else if (containsCommand(message, commandPrompt, 'keeb')) {
                keebCommand(message);
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
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'set-roles')) {
                setRoleMessageCommand(message);
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'add-meme-sub')) {
                addMemeSubCommand(message);
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'add-cute-sub')) {
                addCuteSubCommand(message);
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'set-playlist-name')) {
                setPlaylistNameCommand(message);
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'set-playlist-description')) {
                setPlaylistDescriptionCommand(message);
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'set-command-prefix')) {
                setPrefixCommand(message);
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'add-goodbot')) {
                addGoodBotCommand(message);
            } else if (findRole(message.member, 'botmir-admin') && containsCommand(message, commandPrompt, 'add-badbot')) {
                addBadBotCommand(message);
            }
        })
        .catch((err) => {
            logger.error(`Something went wrong loading the server settings: ${err}`);
        });
}

exports.commandHandler = commandHandler;
