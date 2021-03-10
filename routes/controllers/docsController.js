// const source = require('rfr');
const MarkdownIt = require('markdown-it');
const fs = require('fs');

require.extensions['.md'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const md = new MarkdownIt();
const gettingStartedMD = require('../../docs/GettingStarted.md');
const configurationsMD = require('../../docs/Configurations.md');
const roleReactionsMD = require('../../docs/RoleReactions.md');
const spotifyPluginMD = require('../../docs/SpotifyPlugin.md');
const commandsMD = require('../../docs/Commands.md');

const DocsController = {
    get(req, res) {
        res.render('docs', {
            gettingStarted: md.render(gettingStartedMD),
            configurations: md.render(configurationsMD),
            roleReactions: md.render(roleReactionsMD),
            spotifyPlugin: md.render(spotifyPluginMD),
            commands: md.render(commandsMD),
        });
    },
};

module.exports = DocsController;
