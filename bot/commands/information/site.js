const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

const siteEmbed = {
    title: 'Botomir Website',
    url: 'https://botomir.com/',
};

function siteCommand(message) {
    sendMessage(message.channel, {
        embeds: [siteEmbed],
    });
}

module.exports = {
    args: false,
    name: 'site',
    botAdmin: false,
    description: 'sends link to Botomir\'s website',
    usage: '',
    aliases: [],
    execute: siteCommand,
    docs: `#### Site
- Command: \`site\`
- Returns: an embedded message with a link to Botomir.com
- Example usage:
\`\`\`
User
> !site

Botomir
> <embedded message with link to Botomir.com>
\`\`\``,
};
