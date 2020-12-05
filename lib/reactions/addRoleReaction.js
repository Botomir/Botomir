// addRoleReaction.js
// ==========

const {addRole} = require("../commands/giveRole");

module.exports = {
    addRoleReactionHandler: function (member, roleName) {
        let role = findRole(member, roleName);
        role ? addRole(member, role) : console.log("Error: role not found");
    }
};

function findRole(member, roleName) {
    return member.guild.roles.cache.find(r => r.name === roleName);
}
