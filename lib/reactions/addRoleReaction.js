// addRoleReaction.js
// ==========

function addRoleReactionHandler(member, roleName) {
    let role = findRole(member, roleName);
    role ? addRole(member, role) : console.log("Error: role not found");
}

function addRole(member, role) {
    member.roles.add(role)
        .then(r => console.log("Successfully added member role: " + r))
        .catch(e => console.log("Error: could not give member role: " + e));
}

function findRole(member, roleName) {
    return member.guild.roles.cache.find(r => r.name === roleName);
}

exports.addRoleReactionHandler = addRoleReactionHandler;
