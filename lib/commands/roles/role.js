const source = require('rfr');

const { sendMessage, filterRole, lookupRoleName } = source('lib/utils/util');
const { changeRole } = source('lib/roles/roles');

const privilegedRoles = [
    'Admin',
];

function addRoleCommand(message, args) {
    const roleName = args.join(' ');

    const { member } = message;
    const role = filterRole(lookupRoleName(message.guild, roleName));

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else if (privilegedRoles.includes(role)) {
        sendMessage(message.channel, 'Error: cannot add a privileged role');
    } else {
        changeRole(member, role, 'add');
        sendMessage(message.channel, `Successfully added role \`${roleName}\` to user \`${member.user.username}\``);
    }
}

module.exports = {
    args: 1,
    name: 'role',
    botAdmin: false,
    description: 'add a role to a yourself',
    usage: '<role-name>',
    aliases: [],
    execute: addRoleCommand,
    docs: `#### Assign role
- Command: \`role\`
- Args:
    - requires \`<name-of-role>\` as only argument
- Returns: user is assigned the specified role and a success or failure message is sent
- Limitations:
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with \`@\` tag
- Example usage:
\`\`\`
User
> !role minecraft

Botomir
> Successfully added role \`minecraft\` to user \`User\`
\`\`\``,
};
