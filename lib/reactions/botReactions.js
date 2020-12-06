// botReactions.js
// ==============

const {addRoleReactionHandler} = require("./addRoleReaction");
const {removeRoleReactionHandler} = require("./removeRoleReaction");
const {reactionRoles} = require("../../config.json");

module.exports = {
    addReactionHandler: function (reaction, user) {
        if (reaction.message.id !== process.env.DISCORD_MESSAGE_ID) return;

        reactionRoles.forEach(function (reactionEmoji) {
           if (reaction.emoji.name === reactionEmoji.emoji) {
               addRoleReactionHandler(getReactionMember(reaction, user), reactionEmoji.role);
           }
        });
    },

    removeReactionHandler: function (reaction, user) {
        reactionRoles.forEach(function (reactionEmoji) {
            if (reaction.emoji.name === reactionEmoji.emoji) {
                removeRoleReactionHandler(getReactionMember(reaction, user), reactionEmoji.role);
            }
        });
    }
};

function getReactionMember(reaction, user) {
    return reaction.message.guild.members.cache.find(member => member.id === user.id);
}
