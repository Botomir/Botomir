// removeRoleReaction.js
// =====================

function removeRoleReactionHandler(member, roleName) {
    let role = findRole(member, roleName);
    role ? removeRole(member, role) : console.log("Error: role not found");
}

function removeRole(member, role) {
    member.roles.remove(role)
        .then(r => console.log("Successfully removed member role: " + r))
        .catch(e => console.log("Error: could not remove member role: " + e));
}

function findRole(member, roleName) {
    return member.guild.roles.cache.find(r => r.name === roleName);
}

module.exports = {
    removeRoleReactionHandler:removeRoleReactionHandler
};