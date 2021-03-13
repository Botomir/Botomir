const source = require('rfr');

const { sendMessage, lookupRoleName } = source('bot/utils/util');
const { changeRole, Mode } = source('bot/roles/roles');

function addRoleCommand(message, args, config) {
    const roleName = args.join(' ');

    const { member } = message;
    const role = lookupRoleName(message.guild, roleName);

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else {
        changeRole(member, role, Mode.ADD, config.unassignableRoles)
            .then(() => sendMessage(message.channel, `Successfully added role \`${roleName}\` to user \`${member.user.username}\``))
            .catch((e) => sendMessage(message.channel, `Failed to added role \`${roleName}\` to user \`${member.user.username}\``));
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
