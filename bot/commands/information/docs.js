const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

const docsEmbed = {
    title: 'Botomir Documentation',
    url: 'https://botomir.com/documentation',
};

function docsCommand(message) {
    sendMessage(message.channel, {
        embeds: [docsEmbed],
    });
}

module.exports = {
    args: false,
    name: 'docs',
    botAdmin: false,
    description: 'sends link to Botomir\'s documentation',
    usage: '',
    aliases: [],
    execute: docsCommand,
    docs: `#### Docs
- Command: \`docs\`
- Returns: an embedded message with a link to Botomir.com/documentation.
- Example usage:
\`\`\`
User
> !docs

Botomir
> <embedded message with link to Botmir's documentation>
\`\`\``,
};
