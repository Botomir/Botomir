const source = require('rfr');

const { sendMessage, filterRole, lookupRoleName, getMember } = source('lib/utils/util');
const { changeRole } = source('lib/roles/roles');

const privilegedRoles = [
    'Admin',
];

function giveRoleCommand(message, args) {
    const memberText = args.shift();
    const roleName = args.join(' ');

    const member = getMember(message.guild, memberText);
    const role = filterRole(lookupRoleName(message.guild, roleName));

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else if (privilegedRoles.includes(role)) {
        sendMessage(message.channel, 'Error: cannot give a privileged role');
    } else {
        changeRole(member, role, 'add');
        sendMessage(message.channel, `Successfully added role \`${roleName}\` to user \`${member.user.username}\``);
    }
}

module.exports = {
    args: 2,
    name: 'give',
    botAdmin: false,
    description: 'give a role to a user',
    usage: '@<user> <role-name>',
    aliases: [],
    execute: giveRoleCommand,
    docs: `#### Assign user role
- Command: \`give\`
- Args:
    - requires \`@user\` as first argument
    - requires \`<name of role>\` as second argument
- Returns: specified user is assigned the specified role and a success or failure message is sent
- Limitations:
  - user must be specified with \`@\` tag
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with \`@\` tag
- Example usage:
\`\`\`
User
> !give @User minecraft

Botomir
> Successfully added role \`minecraft\` to user \`User\`
\`\`\``,
};
