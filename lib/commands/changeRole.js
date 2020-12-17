// giveRole.js
// ===========

const source = require("rfr");

const {filterRole, getMember, getRole, splitStringBySpace} = source("lib/commands/commandUtilities");
const {sendMessage} = source("lib/utils/util");

const {privilegedRoles} = source("config.json");

function changeRoleCommand(message, mode) {
    let parts = splitStringBySpace(message.content);
    let member = parts.length === 3 ? getMember(message.guild, parts[1]) : message.member;
    let role = filterRole(getRole(message.guild, parts.length === 3 ? parts[2]: parts[1]));

    if (!role) {
        sendMessage(message.channel, "Error: role not found");
    } else if (!member) {
        sendMessage(message.channel, "Error: member not found");
    } else if (privilegedRoles.includes(role)) {
        sendMessage(message.channel, `Error: cannot ${mode} privileged role`);
    } else {
        mode === "add" ? addRole(member, role) : removeRole(member, role);
        sendRoleConfirmation(message.channel, role.name, member.user.username, mode === "add" ? "added" : "removed");
    }
}

function removeRole(member, role) {
    member.roles.remove(role)
        .then(r => console.log("Successfully removed member role: " + r))
        .catch(e => console.log("Error: could not remove member role: " + e));
}

function addRole(member, role) {
    member.roles.add(role)
        .then(r => console.log("Successfully added member role: " + r))
        .catch(e => console.log("Error: could not give member role: " + e));
}

function sendRoleConfirmation(channel, role, user, mode) {
    sendMessage(channel, `Successfully ${mode} role \`${role}\` to user \`${user}\``);
}

exports.changeRoleCommand = changeRoleCommand;
