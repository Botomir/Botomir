// source.js
// ===========

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const sourceEmbed = {
    description: 'github.com/SoorajModi/Botomir',
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
