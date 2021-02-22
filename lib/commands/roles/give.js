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
};
