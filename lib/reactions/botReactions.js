// // botReactions.js
// // ==============
//
// const source = require('rfr');
//
// const {addRoleReactionHandler, removeRoleReactionHandler}= source('lib/reactions/roleReaction');
// const { getMember } = source('lib/commands/commandUtilities');
// const { loadSettings, lookupReaction } = source('lib/database/mongoDB');
//
// const REACTION_ADD = 0;
// const REACTION_REMOVE = 1;
//
// function reactionHandler(reaction, user, action) {
//     loadSettings(reaction.message.guild.id)
//         .then((config) => {
//             if (reaction.message.id !== config.role_watch_message) return null;
//             return lookupReaction(reaction.message.guild.id, reaction.emoji.name);
//         })
//         .then((roleMapping) => {
//             if (roleMapping !== null) {
//                 const member = getMember(reaction.message.guild, user);
//                 if (action === REACTION_ADD) {
//                     addRoleReactionHandler(member, roleMapping.role_name);
//                 } else if (action === REACTION_REMOVE) {
//                     removeRoleReactionHandler(member, roleMapping.role_name);
//                 }
//             }
//         });
// }
//
// module.exports = {
//     REACTION_ADD,
//     REACTION_REMOVE,
//     reactionHandler,
// };

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
