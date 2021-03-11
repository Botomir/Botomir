const source = require('rfr');
const MarkdownIt = require('markdown-it');
const fs = require('fs');

const { setupCommands } = source('lib/scanner/commandHandler');

require.extensions['.md'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const md = new MarkdownIt();
const gettingStartedMD = require('../../docs/GettingStarted.md');
const configurationsMD = require('../../docs/Configurations.md');
const roleReactionsMD = require('../../docs/RoleReactions.md');
const spotifyPluginMD = require('../../docs/SpotifyPlugin.md');
const gettingHelpMD = require('../../docs/GettingHelp.md');

function renderMarkdown(c) {
    if (c.docs) {
        return md.render(c.docs);
    }
    return null;
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
