// addRoleReaction.js
// ==========
const source = require('rfr');

const { changeRole, findRole } = source('lib/roles/roles');

function addRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, 'add');
}

function removeRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, 'remove');
}

exports = {
    addRoleReactionHandler,
    removeRoleReactionHandler,
};
