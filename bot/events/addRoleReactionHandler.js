const source = require('rfr');

const { changeRole, findRole, Mode } = source('bot/roles/roles');
const { getMember } = source('bot/utils/util');
const {checkForReactionPartial, getRoleForReaction} = source('bot/reactions/botReactions');

function addRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, Mode.ADD);
}

function addReactionHandler(reaction, user) {

    if (reaction.message.guild === null || user.bot) return;

    checkForReactionPartial(reaction);
    getRoleForReaction(reaction)
        .then((mapping) => {
            if (mapping === null) return;
            addRoleReactionHandler(getMember(reaction.message.guild, user), mapping.roleName);
        });
}

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    execute: addReactionHandler,
};
