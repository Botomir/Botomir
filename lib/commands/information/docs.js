const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const docsEmbed = {
    title: 'Botomir Documentation',
    url: 'https://botomir.com/documentation',
};

function docsCommand(message) {
    sendMessage(message.channel, {
        embed: docsEmbed,
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
    docs: '#### Docs\n\n'
        + '- Command: `docs`\n'
        + '- Returns: an embedded message with a link to Botomir.com/documentation.\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !docs\n\n'
        + 'Botomir\n'
        + '> <embedded message with link to Botmir\'s documentation>\n'
        + '```',
};
