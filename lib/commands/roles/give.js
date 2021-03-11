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
    docs: '#### Assign user role\n\n'
        + '- Command: `give`\n'
        + '- Args:\n'
        + '    - requires `@user` as first argument\n'
        + '    - requires `<name_of_role>`as second argument\n'
        + '- Returns: specified user is assigned the specified role and a success or failure message is sent\n'
        + '- Limitations:\n'
        + '  - user must be specified with `@` tag\n'
        + '  - role must be assignable, cannot be a privileged role or a higher role than Botomir\n'
        + '  - role must be spelt exactly as it appears\n'
        + '  - do not specify role with `@` tag\n'
        + '- Example usage:\n'
        + '  - `!give @user minecraft`\n'
        + '```\n'
        + 'User\n'
        + '> !give @User minecraft\n'
        + '\n'
        + 'Botomir\n'
        + '> Successfully added role `minecraft` to user `User`\n'
        + '```',
};
