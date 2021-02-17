// giveRole.js
// ===========

const source = require('rfr');

const { filterRole, lookupRoleName, discardFirst, splitStringBySpace, getMember } = source('lib/commands/commandUtilities');
const { sendMessage } = source('lib/utils/util');
const { changeRole } = source('lib/roles/roles');

const privilegedRoles = [
    'Admin',
];

function sendRoleConfirmation(channel, role, user, mode) {
    sendMessage(channel, `Successfully ${mode} role \`${role}\` to user \`${user}\``);
}

function changeRoleCommand(message, mode) {
    const roleName = discardFirst(message.content);
    const { member } = message;
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

function giveRoleCommand(message, mode) {
    const text = discardFirst(message.content);
    const memberText = splitStringBySpace(text)[0];
    const roleName = discardFirst(text);

    const member = getMember(message.guild, memberText);
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

module.exports =  {
    changeRoleCommand,
    giveRoleCommand
};
