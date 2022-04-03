const source = require('rfr');

const { changeRole, Mode } = source('bot/roles/roles');
const { getMember, getRole, lookupRoleName } = source('bot/utils/util');

const { Role } = source('models/role');
const logger = source('bot/utils/logger');

function removeReactionHandler(reaction, user) {
    if (reaction.message.guild === null || user.bot) return;

    let roleMapping;
    Role.findRole(
        reaction.message.guild.id,
        reaction.message.channel.id,
        reaction.message.id,
        reaction.emoji.name,
    )
        .then((r) => {
            if (r === null) return null;
            roleMapping = r;
            return reaction.message.fetch();
        })
        .then((message) => {
            if (message === null) return null;

            let role;
            if (roleMapping.roleID) {
                role = getRole(message.guild, roleMapping.roleID);
            } else {
                role = lookupRoleName(message.guild, roleMapping.roleName);
            }

            return changeRole(getMember(message.guild, user), role, Mode.REMOVE);
        })
        .catch((e) => logger.error('failed to remove the reaction role', e));
}

module.exports = {
    name: 'messageReactionRemove',
    once: false,
    execute: removeReactionHandler,
};
