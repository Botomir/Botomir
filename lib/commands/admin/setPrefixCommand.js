const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function setPrefixCommand(message, args, config) {
    return config.setCommandPrefix(args[0])
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-prefix',
    botAdmin: true,
    description: 'change the bot command prefix',
    usage: '<character>',
    aliases: [],
    execute: setPrefixCommand,
    docs: '#### Set command prefix\n\n'
        + '- Command: `set-prefix`\n'
        + '- Args:\n'
        + '    - requires`<new_prefix>` as only argument\n'
        + '- Returns: Botomir is updated to use the new command prefix and a success or failure message is sent\n'
        + '- Specifications:\n'
        + '  - Use the ping command to confirm the prefix is updated\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !set-prefix \\\n\n'
        + 'Botomir\n'
        + '> Settings updated.\n'
        + '```\n',
};
