// botReactions.js
// ==============

module.exports = {
    reactionHandler: function (reaction, user) {
        let memberWhoReacted = getReactionMember(reaction, user);

        if (reaction.emoji.name === "maple_leafs") {
            addRole(memberWhoReacted, "test");
        }
    }
};

function getReactionMember(reaction, user) {
    return reaction.message.guild.members.cache.find(member => member.id === user.id);
}

function addRole(member, roleName) {
    let role = findRole(member, roleName);
    if(role) {
        member.roles.add(role);
    } else {
        console.log("Error (botReactions): role not found")
    }
}

// Helper Functions

function findRole(member, roleName) {
    return member.guild.roles.cache.find(r => r.name === roleName);
}