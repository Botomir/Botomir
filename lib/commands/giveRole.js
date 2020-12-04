// giveRole.js
// ===========

const {filterRole, getMember, getRole, invalidRoleErrorHandler} = require("./utilityFunctions");

module.exports = {
    giveRole: function (message) {
        let member = getMember(message);
        let role = filterRole(getRole(message));

        if (!role) {
            invalidRoleErrorHandler(message);
            console.log("Error (botCommands): role not found");
        } else {
            giveMemberRole(member, role, message);
            message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + member.user.username + "\`")
                .then(r => "Successfully sent added role confirmation message - " + r)
                .catch(e => "Error: encountered error when sending added role confirmation message - " + e);
        }
    }
};

function giveMemberRole(member, role, message) {
    if (role.name !== "admin") {
        member.roles.add(role)
            .then(r => "Successfully added member role - " + r)
            .catch(e => "Error: could not give member role - " + e);
    } else {
        message.channel.send("Error: cannot give privileged role")
            .then(r => "Successfully sent add privileged role error message - " + r)
            .catch(e => "Error: could not send add privileged role error message - " + e);
    }
}
