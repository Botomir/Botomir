const source = require('rfr');

const { changeRole, findRole, Mode } = source('bot/roles/roles');
const { getMember } = source('bot/utils/util');
const {checkForReactionPartial, getRoleForReaction} = source('bot/reactions/botReactions');

function removeRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, Mode.REMOVE);
}

function removeReactionHandler(reaction, user) {

    if (reaction.message.guild === null || user.bot) return;

    checkForReactionPartial(reaction);
    getRoleForReaction(reaction)
        .then((mapping) => {
            if (mapping === null) return;
            removeRoleReactionHandler(getMember(reaction.message.guild, user), mapping.roleName);
        });
}

module.exports = {
    name: 'messageReactionRemove',
    once: false,
    execute: removeReactionHandler,
};
