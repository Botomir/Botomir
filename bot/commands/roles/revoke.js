const source = require('rfr');

const { sendMessage, lookupRoleName, getMember } = source('bot/utils/util');
const { changeRole, Mode } = source('bot/roles/roles');

function revokeRoleCommand(message, args, config) {
    const memberText = args.shift();
    const roleName = args.join(' ');

    const member = getMember(message.guild, memberText);
    const role = lookupRoleName(message.guild, roleName);

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else {
        changeRole(member, role, Mode.REMOVE, config.unassignableRoles)
            .then(() => sendMessage(message.channel, `Successfully removed role \`${roleName}\` from user \`${member.user.username}\``))
            .catch((e) => sendMessage(message.channel, `Failed to removed role \`${roleName}\` from user \`${member.user.username}\``));
    }
}

module.exports = {
    args: 2,
    name: 'revoke',
    botAdmin: false,
    description: 'remove a role from a user',
    usage: '@<user> <role-name>',
    aliases: [],
    execute: revokeRoleCommand,
    docs: `#### Revoke role from user
- Command: \`revoke\`
- Args:
  - requires \`@user\` as first argument
  - requires \`<name of role>\`as second argument
- Returns: specified role assignment is removed from specified user and a success or failure message is sent
- Limitations:
  - user must be specified with \`@\` tag
  - role must be assignable, cannot be a privileged role or a higher role than Botomir\n'
  - role must be spelt exactly as it appears\n'
  - do not specify role with \`@\` tag
- Example usage:\n'
\`\`\`
User
> !revoke @User minecraft

Botomir
> Successfully removed role \`minecraft\` from user \`User\`
\`\`\``,
};
