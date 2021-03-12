const source = require('rfr');
const MarkdownIt = require('markdown-it');
const fs = require('fs');

const { setupCommands } = source('lib/scanner/commandHandler');
const md = new MarkdownIt();

const gettingStartedMD = fs.readFileSync('docs/GettingStarted.md', 'utf-8');
const configurationsMD = fs.readFileSync('docs/Configurations.md', 'utf-8');
const roleReactionsMD = fs.readFileSync('docs/RoleReactions.md', 'utf-8');
const spotifyPluginMD = fs.readFileSync('docs/SpotifyPlugin.md', 'utf-8');
const gettingHelpMD = fs.readFileSync('docs/GettingHelp.md', 'utf-8');

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
            gettingStarted: md.render(gettingStartedMD),
            configurations: md.render(configurationsMD),
            roleReactions: md.render(roleReactionsMD),
            spotifyPlugin: md.render(spotifyPluginMD),
            commands,
            gettingHelp: md.render(gettingHelpMD),
        });
    },
};

module.exports = DocsController;
