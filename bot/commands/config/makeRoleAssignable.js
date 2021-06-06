const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function makeAssignableCommand(message, args, config) {
    return config.removeUnassignable(args.join(' '))
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'remove-unassignable',
    botAdmin: true,
    description: 'remove a role to the list that can not be assigned on this server',
    usage: '<roleName>',
    aliases: [],
    execute: makeAssignableCommand,
    docs: `#### Make a role unassignable by Botomir
- Command: \`!remove-unassignable <name of role>\`
- Returns: role name is removed from the list of unassignable roles and success or failure message is sent
- Example usage:
  - \`!remove-unassignable Admin\`
\`\`\`
User:
> !remove-unassignable Admin

Botomir
> Settings updated.
\`\`\``,
};
