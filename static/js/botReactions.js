// botReactions.js
// ==============

module.exports = {
    getReactionMember: function (reaction, user) {
        return reaction.message.guild.members.cache.find(member => member.id === user.id);
    },

    addRole: function (member, roleName) {
        let role = findRole(member, roleName);
        member.roles.add(role);
    }
};

function findRole(member, roleName) {
    return member.guild.roles.cache.find(r => r.name === roleName);
}