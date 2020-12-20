// botReactions.js
// ==============

const source = require('rfr');

const { addRoleReactionHandler, removeRoleReactionHandler } = source('lib/reactions/roleReaction');
const { getMember } = source('lib/commands/commandUtilities');

const { reactionRoles } = source('config.json');

function addReactionHandler(reaction, user) {
    reactionRoles.forEach((reactionEmoji) => {
        if (reaction.emoji.name === reactionEmoji.emoji) {
            addRoleReactionHandler(getMember(reaction.message.guild, user), reactionEmoji.role);
        }
    });
}

function removeReactionHandler(reaction, user) {
    reactionRoles.forEach((reactionEmoji) => {
        if (reaction.emoji.name === reactionEmoji.emoji) {
            removeRoleReactionHandler(getMember(reaction.message.guild, user), reactionEmoji.role);
        }
    });
}

module.exports = {
    addReactionHandler,
    removeReactionHandler,
};
