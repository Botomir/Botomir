const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function addUnassignableCommand(message, args, config) {
    return config.addUnassignable(args.join(' '))
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'add-unassignable',
    botAdmin: true,
    description: 'add a role to the list that can not be assigned on this server',
    usage: '<roleName>',
    aliases: [],
    execute: addUnassignableCommand,
    docs: `#### Make a role unassignable by Botomir
- Command: \`!add-unassignable <name of role>\`
- Returns: role name is added to list of unassignable role and success or failure message is sent
- Example usage:
  - \`!add-unassignable Admin\`
\`\`\`
User:
> !add-unassignable Admin

Botomir
> Settings updated.
\`\`\``,
};
