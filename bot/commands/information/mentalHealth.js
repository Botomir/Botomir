const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function mentalHealthCommand(message, args, config) {
    const mhEmbed = {
        color: 0x0099ff,
        title: 'Mental Health',
        fields: config.mentalHealth.map((i) => ({
            name: i.name,
            value: i.url,
        })),
    };

    sendMessage(message.channel, {
        embed: mhEmbed,
    });
}

module.exports = {
    args: false,
    name: 'mental-health',
    botAdmin: false,
    description: 'sends mental health resources',
    usage: '',
    aliases: ['mh'],
    execute: mentalHealthCommand,
};
