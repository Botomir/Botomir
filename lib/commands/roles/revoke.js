// giveRole.js
// ===========

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
};
