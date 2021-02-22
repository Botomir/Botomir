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
};
