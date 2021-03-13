const source = require('rfr');

const { sendMessage, lookupRoleName } = source('bot/utils/util');
const { changeRole, Mode } = source('bot/roles/roles');

function removeRoleCommand(message, args, config) {
    const roleName = args.join(' ');

    const { member } = message;
    const role = lookupRoleName(message.guild, roleName);

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else {
        changeRole(member, role, Mode.REMOVE, config.unassignableRoles)
            .then(() => sendMessage(message.channel, `Successfully removed role from \`${member.user.username}\``))
            .catch((e) => sendMessage(message.channel, `Failed to removed role from \`${member.user.username}\` - ${e.message}`));
    }
}

module.exports = {
    args: 1,
    name: 'remove',
    botAdmin: false,
    description: 'remove a role from a yourself',
    usage: '<role-name>',
    aliases: [],
    execute: removeRoleCommand,
    docs: `#### Remove role
- Command: \`remove\`
- Args:
    - requires \`<name of role>\` as only argument
- Returns: specified role assignment is removed from user and a success or failure message is sent\
- Limitations:
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with \`@\` tag
- Example usage:
\`\`\`
User
> !remove minecraft

Botomir
> Successfully removed role \`minecraft\` from user \`User\`
\`\`\``,
};
