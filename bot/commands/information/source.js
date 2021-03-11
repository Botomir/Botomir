const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

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
};
