// botReactions.js
// ==============

const {addRoleReactionHandler} = require("./addRoleReaction");
const {reactionRoles} = require("../../config.json");

module.exports = {
    addReactionHandler: function (reaction, user) {
        reactionRoles.forEach(function (reactionEmoji) {
            console.log(reaction.emoji.name.toString() + "|" + reactionEmoji.emoji);
           if (reaction.emoji.name === reactionEmoji.emoji) {
               addRoleReactionHandler(getReactionMember(reaction, user), reactionEmoji.role);
           }
        });
    }
};

function getReactionMember(reaction, user) {
    return reaction.message.guild.members.cache.find(member => member.id === user.id);
}
