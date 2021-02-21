const source = require('rfr');

const logger = source('lib/utils/logger');

function removeRole(member, role) {
    member.roles.remove(role)
        .then((r) => logger.info('Successfully removed member role:', r))
        .catch((e) => logger.error('Error: could not remove member role:', e));
}

function addRole(member, role) {
    member.roles.add(role)
        .then((r) => logger.info('Successfully added member role:', r))
        .catch((e) => logger.error('Error: could not give member role:', e));
}

function changeRole(member, role, mode) {
    if (!role) {
        logger.warn('role not found');
        return;
    }

    if (mode === 'add') {
        addRole(member, role);
    } else if (mode === 'remove') {
        removeRole(member, role);
    }
}

function findRole(member, roleName) {
    return member.guild.roles.cache.find((r) => r.name === roleName);
}

module.exports = {
    findRole,
    changeRole,
};
