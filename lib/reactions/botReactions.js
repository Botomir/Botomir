// botReactions.js
// ==============

const source = require('rfr');

const {addRoleReactionHandler} = source('lib/reactions/addRoleReaction');
const {removeRoleReactionHandler} = source('lib/reactions/removeRoleReaction');
const {reactionRoles} = source('config.json');

function addReactionHandler(reaction, user) {
    reactionRoles.forEach(function (reactionEmoji) {
        if (reaction.emoji.name === reactionEmoji.emoji) {
            addRoleReactionHandler(getReactionMember(reaction, user), reactionEmoji.role);
        }
    });
}

function removeReactionHandler(reaction, user) {
    reactionRoles.forEach(function (reactionEmoji) {
        if (reaction.emoji.name === reactionEmoji.emoji) {
            removeRoleReactionHandler(getReactionMember(reaction, user), reactionEmoji.role);
        }
    });
}

function getReactionMember(reaction, user) {
    return reaction.message.guild.members.cache.find(member => member.id === user.id);
}

module.exports = {
    addReactionHandler: addReactionHandler,
    removeReactionHandler: removeReactionHandler
};
