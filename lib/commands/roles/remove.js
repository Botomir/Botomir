const source = require('rfr');

const { sendMessage, filterRole, lookupRoleName } = source('lib/utils/util');
const { changeRole } = source('lib/roles/roles');

const privilegedRoles = [
    'Admin',
];

function removeRoleCommand(message, args) {
    const roleName = args.join(' ');

    const { member } = message;
    const role = filterRole(lookupRoleName(message.guild, roleName));

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else if (privilegedRoles.includes(role)) {
        sendMessage(message.channel, 'Error: cannot remove a privileged role');
    } else {
        changeRole(member, role, 'remove');
        sendMessage(message.channel, `Successfully removed role \`${roleName}\` from user \`${member.user.username}\``);
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
