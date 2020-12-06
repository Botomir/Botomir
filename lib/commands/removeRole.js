// removeRole.js
// =============

const {filterRole, getMember, getRole, invalidRoleErrorHandler} = require("./commandUtilities");
const {privilegedRoles} = require("../../config.json");

module.exports = {
    removeRole: function (message) {
        let member = getMember(message);
        let role = filterRole(getRole(message));

        if (!role) {
            invalidRoleErrorHandler(message);
        }  else if (privilegedRoles.includes(role)) {
            removedPrivilegedRoleError(message);
        } else {
            removeRole(member, role, message);
            sendRoleRemovedConfirmation(member, role, message);
        }
    }
};

function removeRole(member, role) {
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
