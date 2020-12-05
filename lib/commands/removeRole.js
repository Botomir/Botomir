// removeRole.js
// =============

const {filterRole, getMember, getRole, invalidRoleErrorHandler} = require("./commandUtilities");

module.exports = {
    removeRole: function (message) {
        let member = getMember(message);
        let role = filterRole(getRole(message));

        if (!role) {
            invalidRoleErrorHandler(message);
        } else {
            removeMemberRole(member, role, message).then(r => console.log(r));
            message.channel.send("Successfully removed role \`" + role.name + "\` to user \`" + member.user.username + "\`")
                .then(r => "Successfully sent removed role confirmation message: " + r)
                .catch(e => "Error: encountered error when sending removed role confirmation message: " + e);
        }
    }
};

function removeMemberRole(member, role, message) {
    if (role.name !== "admin") {
        member.roles.remove(role)
            .then(r => "Successfully removed member role: " + r)
            .catch(e => "Error: could not remove member role: " + e);
    } else {
        message.channel.send("Error (botCommands): cannot remove admin role")
            .then(r => "Successfully completed mental-health command: " + r)
            .catch(e => "Error: could not execute mental-health command: " + e);
    }
}
