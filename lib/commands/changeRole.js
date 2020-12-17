// giveRole.js
// ===========

const source = require('rfr');

const { filterRole, getMember, getRole, splitStringBySpace } = source('lib/commands/commandUtilities');
const { sendMessage } = source('lib/utils/util');
const { addRole, removeRole } = source('lib/roles/roles');

const { privilegedRoles } = source('config.json');

function sendRoleConfirmation(channel, role, user, mode) {
    sendMessage(channel, `Successfully ${mode} role \`${role}\` to user \`${user}\``);
}

function changeRoleCommand(message, mode) {
    const parts = splitStringBySpace(message.content);
    const member = parts.length === 3 ? getMember(message.guild, parts[1]) : message.member;
    const role = filterRole(getRole(message.guild, parts.length === 3 ? parts[2] : parts[1]));

    if (!role) {
        sendMessage(message.channel, 'Error: role not found');
    } else if (!member) {
        sendMessage(message.channel, 'Error: member not found');
    } else if (privilegedRoles.includes(role)) {
        sendMessage(message.channel, `Error: cannot ${mode} privileged role`);
    } else {
        mode === 'add' ? addRole(member, role) : removeRole(member, role);
        sendRoleConfirmation(message.channel, role.name, member.user.username, mode === 'add' ? 'added' : 'removed');
    }
}

exports.changeRoleCommand = changeRoleCommand;
