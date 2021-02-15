// botReactions.js
// ==============

const source = require('rfr');

const { addRoleReactionHandler, removeRoleReactionHandler } = source('lib/reactions/roleReaction');
const { getMember } = source('lib/commands/commandUtilities');
const { loadSettings, lookupReaction } = source('lib/database/mongoDB');

function getRoleForReaction(reaction) {
    const message = reaction.message.id;

    return loadSettings(reaction.message.guild.id)
        .then((config) => {
            if (message === config.role_watch_message) {
                return lookupReaction(config.guild, reaction.emoji.name);
            }
            return null;
        })
        .catch(() => null);
}

function addReactionHandler(reaction, user) {
    getRoleForReaction(reaction)
        .then((mapping) => {
            if (mapping === null) return;
            addRoleReactionHandler(getMember(reaction.message.guild, user), mapping.role_name);
        });
}

function removeReactionHandler(reaction, user) {
    getRoleForReaction(reaction)
        .then((mapping) => {
            if (mapping === null) return;
            removeRoleReactionHandler(getMember(reaction.message.guild, user), mapping.role_name);
        });
}

module.exports = {
    addReactionHandler,
    removeReactionHandler,
};
