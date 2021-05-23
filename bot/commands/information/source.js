const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

const sourceEmbed = {
    title: 'Botomir Source Code',
    url: 'https://github.com/Botomir/Botomir',
};

function sourceCommand(message) {
    sendMessage(message.channel, {
        embed: sourceEmbed,
    });
}

module.exports = {
    args: false,
    name: 'source',
    botAdmin: false,
    description: 'sends link to source code',
    usage: '',
    aliases: [],
    execute: sourceCommand,
    docs: `#### Source
- Command: \`source\`
- Returns: an embedded message with a link to Botomir's source code on GitHub
- Example usage:
\`\`\`
User
> !source

Botomir
> <embedded message with link to source code>
\`\`\``,
};
