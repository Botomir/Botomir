// addRole.js
// ==========

module.exports = {
    addRole: function (member, roleName) {
        let role = findRole(member, roleName);
        role ? member.roles.add(role) : console.log("Error (botReactions): role not found");
    }
};

function findRole(member, roleName) {
    return member.guild.roles.cache.find(r => r.name === roleName);
}
