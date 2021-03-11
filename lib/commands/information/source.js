const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const sourceEmbed = {
    title: 'Botomir Source Code',
    url: 'https://github.com/SoorajModi/Botomir',
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
    docs: '#### Source\n\n'
        + '- Command: `source`\n'
        + '- Returns: an embedded message with a link to Botomir\'s source code on GitHub\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !source\n'
        + '\n'
        + 'Botomir\n'
        + '> <embedded message with link to source code>\n'
        + '```\n',
};
