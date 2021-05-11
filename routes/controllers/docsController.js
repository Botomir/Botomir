const source = require('rfr');
const MarkdownIt = require('markdown-it');
const fs = require('fs');

const Bot = source('bot');

const md = new MarkdownIt();

const gettingStartedMD = fs.readFileSync('docs/GettingStarted.md', 'utf-8');
const configurationsMD = fs.readFileSync('docs/Configurations.md', 'utf-8');
const roleReactionsMD = fs.readFileSync('docs/RoleReactions.md', 'utf-8');
const spotifyPluginMD = fs.readFileSync('docs/SpotifyPlugin.md', 'utf-8');
const gettingHelpMD = fs.readFileSync('docs/GettingHelp.md', 'utf-8');
const webhooksMD = fs.readFileSync('docs/webhooks.md', 'utf-8');

const gettingStarted = md.render(gettingStartedMD);
const configurations = md.render(configurationsMD);
const roleReactions = md.render(roleReactionsMD);
const spotifyPlugin = md.render(spotifyPluginMD);
const gettingHelp = md.render(gettingHelpMD);
const webhooks = md.render(webhooksMD);

function renderMarkdown(command) {
    return (command.docs) ? md.render(command.docs) : null;
}

const DocsController = {
    get(req, res) {
        const commands = Bot.client.commands.map((command) => renderMarkdown(command)).filter(Boolean);
        res.render('docs', {
            gettingStarted,
            configurations,
            roleReactions,
            spotifyPlugin,
            webhooks,
            commands,
            gettingHelp,
        });
    },
};

module.exports = DocsController;
