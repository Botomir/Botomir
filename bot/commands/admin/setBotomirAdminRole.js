const source = require('rfr');

const { sendMessage, lookupRoleName } = source('bot/utils/util');

function setBotomirAdminRole(message, args, config) {
    if (!lookupRoleName(message.guild, args.join(' '))) {
        return sendMessage(message.channel, 'Error: that role does not exist!');
    }
    return config.setAdminRole(args.join(' '))
        .save()
        .then(() => sendMessage(message.channel, `The admin role has been updated to ${args.join(' ')}`))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-botomir-admin-role',
    botAdmin: true,
    description: 'change the bot admin role name',
    usage: '<string>',
    aliases: ['set-admin'],
    execute: setBotomirAdminRole,
    docs: `#### Set command prefix
- Command: \`set-admin-role-name\`
- Args:
    - requires \`<new-role>\` as only argument
- Returns: Botomir is updated to use the new admin role and a success or failure message is sent
- Specifications:
  - Use the ping command to confirm the role name is updated
- Example usage:
\`\`\`
User
> !set-admin bot-lord

Botomir
> Settings updated.
\`\`\``,
};
