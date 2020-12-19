// addRoleReaction.js
// ==========
const source = require('rfr');

const logger = source('lib/utils/logger');
const { addRole, removeRole, findRole } = source('lib/roles/roles');

function addRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    role ? addRole(member, role) : logger.log('Error: role not found');
}

function removeRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    role ? removeRole(member, role) : logger.log('Error: role not found');
}

exports = {
    addRoleReactionHandler,
    removeRoleReactionHandler,
};
