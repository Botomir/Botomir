// removeRole.js
// =============

const source = require("rfr");

const {filterRole, getMember, getRole, invalidRoleErrorHandler} = source("lib/commands/commandUtilities");
const {privilegedRoles} = source("config.json");

function removeRole(message) {
    let member = getMember(message);
    let role = filterRole(getRole(message));

    if (!role) {
        invalidRoleErrorHandler(message);
    } else if (privilegedRoles.includes(role)) {
        removedPrivilegedRoleError(message);
    } else {
        removeMemberRole(member, role, message);
        sendRoleRemovedConfirmation(member, role, message);
    }
}

function removeMemberRole(member, role) {
    member.roles.remove(role)
        .then(r => console.log("Successfully removed member role: " + r))
        .catch(e => console.log("Error: could not remove member role: " + e));
}

function sendRoleRemovedConfirmation(member, role, message) {
    message.channel.send("Successfully removed role \`" + role.name + "\` to user \`" + member.user.username + "\`")
        .then(r => console.log("Successfully sent removed role confirmation message: " + r))
        .catch(e => console.log("Error: encountered error when sending removed role confirmation message: " + e));
}

function removedPrivilegedRoleError(message) {
    message.channel.send("Error: cannot remove privileged role")
        .then(r => console.log("Successfully sent remove privileged role error message: " + r))
        .catch(e => console.log("Error: could not send remove privileged role error message: " + e));
}

exports.removeRole = removeRole;
