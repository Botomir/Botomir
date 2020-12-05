// botReactions.js
// ==============

const {addRoleReactionHandler} = require("./addRoleReaction");

module.exports = {
    reactionHandler: function (reaction, user) {
        let memberWhoReacted = getReactionMember(reaction, user);

        if (reaction.emoji.name === "maple_leafs") {
            addRoleReactionHandler(memberWhoReacted, "test");
        }
    }
};

function getReactionMember(reaction, user) {
    return reaction.message.guild.members.cache.find(member => member.id === user.id);
}
