// giveRole.js
// ===========

const source = require('rfr');

const { filterRole, lookupRoleName, splitStringBySpace, discardCommand} = source('lib/commands/commandUtilities');
const { sendMessage } = source('lib/utils/util');
const { changeRole } = source('lib/roles/roles');

const privilegedRoles = [
    'Admin',
];

function sendRoleConfirmation(channel, role, user, mode) {
    sendMessage(channel, `Successfully ${mode} role \`${role}\` to user \`${user}\``);
}

function changeRoleCommand(message, mode) {
    const roleName = discardCommand(message.content);
    const member =  message.member;
    const role = filterRole(lookupRoleName(message.guild, roleName));

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else if (privilegedRoles.includes(role)) {
        sendMessage(message.channel, `Error: cannot ${mode} privileged role`);
    } else {
        changeRole(member, role, mode);
        sendRoleConfirmation(message.channel, role.name, member.user.username, mode === 'add' ? 'added' : 'removed');
    }
}

exports.changeRoleCommand = changeRoleCommand;
