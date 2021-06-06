const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function setPrefixCommand(message, args, config) {
    return config.setCommandPrefix(args[0])
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'prefix',
    botAdmin: true,
    description: 'change the bot command prefix',
    usage: '<character>',
    aliases: ['set-prefix'],
    execute: setPrefixCommand,
    docs: `#### Set command prefix
- Command: \`set-prefix\`
- Args:
    - requires \`<new_prefix>\` as only argument
- Returns: Botomir is updated to use the new command prefix and a success or failure message is sent
- Specifications:
  - Use the ping command to confirm the prefix is updated
- Example usage:
\`\`\`
User
> !set-prefix \\

Botomir
> Settings updated.
\`\`\``,
};
