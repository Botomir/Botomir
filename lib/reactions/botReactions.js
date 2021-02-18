// botReactions.js
// ==============

const source = require('rfr');

const { addRoleReactionHandler, removeRoleReactionHandler } = source('lib/reactions/roleReaction');
const { getMember } = source('lib/utils/util');

const { Settings } = source('lib/database/models/settings');
const { Role } = source('lib/database/models/role');

function getRoleForReaction(reaction) {
    const message = reaction.message.id;

    return Settings.getServerSettings(reaction.message.guild.id)
        .then((config) => {
            if (message === config.roleMessage) {
                return Role.findRole(config.guildID, reaction.emoji.name);
            }
            return null;
        })
        .catch(() => null);
}

function addReactionHandler(reaction, user) {
    getRoleForReaction(reaction)
        .then((mapping) => {
            if (mapping === null) return;
            addRoleReactionHandler(getMember(reaction.message.guild, user), mapping.roleName);
        });
}

function removeReactionHandler(reaction, user) {
    getRoleForReaction(reaction)
        .then((mapping) => {
            if (mapping === null) return;
            removeRoleReactionHandler(getMember(reaction.message.guild, user), mapping.roleName);
        });
}

module.exports = {
    addReactionHandler,
    removeReactionHandler,
};
