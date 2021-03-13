const source = require('rfr');

const { sendMessage, lookupRoleName, getMember } = source('bot/utils/util');
const { changeRole, Mode } = source('bot/roles/roles');

function giveRoleCommand(message, args, config) {
    const memberText = args.shift();
    const roleName = args.join(' ');

    const member = getMember(message.guild, memberText);
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
