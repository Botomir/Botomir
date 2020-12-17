// botCommands.js
// ==============

const source = require('rfr');

const {commandPrompt} = source('config.json');
const {pingCommand} = source('lib/commands/ping');
const {helpCommand} = source('lib/commands/help');
const {changeRoleCommand} = source('lib/commands/changeRole');
const {redditCommand, memeCommand, puppyCommand, cuteCommand} = source('lib/commands/redditPost');
const {mentalHealthCommand} = source('lib/commands/mentalHealth');
const {weatherCommand} = source('lib/commands/weather');
const {nicknameCommand} = source('lib/commands/nickname');
const {generatePlaylistCommand, authenticateSpotify} = source('lib/commands/spotify');

function commandHandler(message) {
    if (containsCommand(message, 'ping')) {
        pingCommand(message);
    } else if (containsCommand(message, 'help')) {
        helpCommand(message, commandPrompt);
    } else if (containsCommand(message, 'role')) {
        changeRoleCommand(message, 'add');
    } else if (containsCommand(message, 'remove')) {
        changeRoleCommand(message, 'remove');
    } else if (containsCommand(message, 'reddit')) {
        redditCommand(message);
    } else if (containsCommand(message, 'puppy')) {
        puppyCommand(message);
    } else if (containsCommand(message, 'cute')) {
        cuteCommand(message);
    } else if (containsCommand(message, 'mental-health')) {
        mentalHealthCommand(message);
    } else if (containsCommand(message, 'meme')) {
        memeCommand(message);
    } else if (containsCommand(message, 'weather')) {
        weatherCommand(message);
    } else if (containsCommand(message, 'nickname')) {
        nicknameCommand(message);
    } else if (containsCommand(message, 'createplaylist')) {
        generatePlaylistCommand(message);
    } else if (containsCommand(message, 'authspotify')) {
        authenticateSpotify(message);
    } else if (containsCommand(message, 'test')) {
        message.guild.roles.fetch()
            .then(roles => roles.cache.each(r => console.log(`${r.name} ${r.id} ${r.editable}`)))
            .catch(console.error);
    }
}

function containsCommand(message, command) {
    return message.content.toLowerCase().startsWith(commandPrompt + command);
}

exports.commandHandler = commandHandler;
