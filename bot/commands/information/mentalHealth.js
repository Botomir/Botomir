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
        embeds: [mhEmbed],
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
    docs: `#### Mental Health
- Command: \`mental-health\`
- Returns: embedded message with mental health resources
- Example usage:
\`\`\`
User
> !mental-health

Botomir
> <embedded message with link to mental-health resources>
\`\`\``,
};
