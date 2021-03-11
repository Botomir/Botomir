const source = require('rfr');

const { sendMessage, filterRole, lookupRoleName } = source('bot/utils/util');
const { changeRole } = source('bot/roles/roles');

const privilegedRoles = [
    'Admin',
];

function removeRoleCommand(message, args) {
    const roleName = args.join(' ');

    const { member } = message;
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
    args: 1,
    name: 'remove',
    botAdmin: false,
    description: 'remove a role from a yourself',
    usage: '<role-name>',
    aliases: [],
    execute: removeRoleCommand,
};
