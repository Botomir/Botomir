const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

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
};
