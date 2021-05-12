const source = require('rfr');

const { changeRole, findRole, Mode } = source('bot/roles/roles');
const logger = source('bot/utils/logger');

function addRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);

    if (!role) {
        logger.error(`Cant add the role named ${roleName} from ${member.id}, the role does not exist`);
        return;
    }

    changeRole(member, role, Mode.ADD);
}

function removeRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);

    if (!role) {
        logger.error(`Cant remove the role named ${roleName} from ${member.id}, the role does not exist`);
        return;
    }

    changeRole(member, role, Mode.REMOVE);
}

module.exports = {
    addRoleReactionHandler,
    removeRoleReactionHandler,
};
