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
    docs: '#### Assign role\n\n'
        + '- Command: `role`\n'
        + '- Args:\n'
        + '    - requires`<name_of_role>` as only argument\n'
        + '- Returns: user is assigned the specified role and a success or failure message is sent\n'
        + '- Limitations:\n'
        + '  - role must be assignable, cannot be a privileged role or a higher role than Botomir\n'
        + '  - role must be spelt exactly as it appears\n'
        + '  - do not specify role with `@` tag\n'
        + '- Example usage:\n'
        + '```\n'
        + 'User\n'
        + '> !role minecraft\n\n'
        + 'Botomir\n'
        + '> Successfully added role `minecraft` to user `User`',
};
