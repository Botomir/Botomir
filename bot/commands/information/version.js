const source = require('rfr');

const { version } = source('package');
const { sendMessage } = source('bot/utils/util');
const commit = (process.env.VCS_REF || 'unknown').slice(0, 7);

function versionCommand(message) {
    sendMessage(message.channel, `Version: \`${version}\`\nBuild: \`${commit}\``);
}

module.exports = {
    args: false,
    name: 'version',
    botAdmin: false,
    description: 'Send the running Botomir version information',
    usage: '',
    aliases: [],
    execute: versionCommand,
    docs: `#### Version
- Command: \`version\`
- Returns: a message with the version number
- Example usage:
\`\`\`
User
> !version

Botomir
> Version: \`1.2.3\`
Build: \`4ba590e\`
\`\`\``,
};
