const source = require('rfr');
const MarkdownIt = require('markdown-it');
const fs = require('fs');

const { setupCommands } = source('bot/scanner/commandHandler');
const md = new MarkdownIt();

const gettingStartedMD = fs.readFileSync('docs/GettingStarted.md', 'utf-8');
const configurationsMD = fs.readFileSync('docs/Configurations.md', 'utf-8');
const roleReactionsMD = fs.readFileSync('docs/RoleReactions.md', 'utf-8');
const spotifyPluginMD = fs.readFileSync('docs/SpotifyPlugin.md', 'utf-8');
const gettingHelpMD = fs.readFileSync('docs/GettingHelp.md', 'utf-8');

const gettingStarted = md.render(gettingStartedMD);
const configurations = md.render(configurationsMD);
const roleReactions = md.render(roleReactionsMD);
const spotifyPlugin = md.render(spotifyPluginMD);
const gettingHelp = md.render(gettingHelpMD);

function renderMarkdown(command) {
    return (command.docs) ? md.render(command.docs) : null;
}

const DocsController = {
    get(req, res) {
        const client = {
        };
        setupCommands(client);
        const commands = client.commands.map((command) => renderMarkdown(command)).filter(Boolean);
        res.render('docs', {
            gettingStarted,
            configurations,
            roleReactions,
            spotifyPlugin,
            commands,
            gettingHelp,
        });
    },
};

module.exports = DocsController;
