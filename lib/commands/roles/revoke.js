const source = require('rfr');

const { sendMessage, filterRole, lookupRoleName, getMember } = source('lib/utils/util');
const { changeRole } = source('lib/roles/roles');

const privilegedRoles = [
    'Admin',
];

function revokeRoleCommand(message, args) {
    const memberText = args.shift();
    const roleName = args.join(' ');

    const member = getMember(message.guild, memberText);
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
    args: 2,
    name: 'revoke',
    botAdmin: false,
    description: 'remove a role from a user',
    usage: '@<user> <role-name>',
    aliases: [],
    execute: revokeRoleCommand,
    docs: '#### Revoke role from user\n\n'
        + '- Command: `revoke`\n'
        + '- Args:\n'
        + '    - requires `@user` as first argument\n'
        + '    - requires `<name_of_role>`as second argument\n'
        + '- Returns: specified role assignment is removed from specified user and a success or failure message is sent\n'
        + '- Limitations:\n'
        + '  - user must be specified with `@` tag\n'
        + '  - role must be assignable, cannot be a privileged role or a higher role than Botomir\n'
        + '  - role must be spelt exactly as it appears\n'
        + '  - do not specify role with `@` tag\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !revoke @User minecraft\n\n'
        + 'Botomir\n'
        + '> Successfully removed role `minecraft` from user `User`\n'
        + '```',
};
