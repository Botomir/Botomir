// docs.js
// ===========

const source = require('rfr');
const {sendMessage} = source('lib/utils/util');

const docsEmbed = {
    description: "botomir.com/documentation"
};

function docsCommand(message) {
    sendMessage(message.channel, {
        embed: docsEmbed
    });
}

module.exports = {
    args: false,
    name: 'docs',
    botAdmin: false,
    description: 'sends link to source code',
    usage: '',
    aliases: [],
    execute: docsCommand,
};
