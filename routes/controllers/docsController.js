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
const commandsMD = require('../../docs/Commands.md');

function temp(c) {
    if (c.docs) {
        return md.render(c.docs);
    }
}

const DocsController = {
    get(req, res) {
        const client = {
        };
        setupCommands(client);
        console.log(client);
        const tempCommand = client.commands.map((c) => temp(c))
            .filter(Boolean);
        console.log(tempCommand);
        res.render('docs', {
            gettingStarted: md.render(gettingStartedMD),
            configurations: md.render(configurationsMD),
            roleReactions: md.render(roleReactionsMD),
            spotifyPlugin: md.render(spotifyPluginMD),
            commands: md.render(commandsMD),
            tempCommands: tempCommand,
        });
    },
};

module.exports = DocsController;
