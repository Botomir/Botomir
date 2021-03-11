const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const siteEmbed = {
    title: 'Botomir Website',
    url: 'https://botomir.com/',
};

function siteCommand(message) {
    sendMessage(message.channel, {
        embed: siteEmbed,
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
    docs: '#### Site\n\n'
        + '- Command: `site`\n'
        + '- Returns: an embedded message with a link to Botomir.com\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !site\n\n'
        + 'Botomir\n'
        + '> <embedded message with link to Botomir.com>\n'
        + '```',
};
