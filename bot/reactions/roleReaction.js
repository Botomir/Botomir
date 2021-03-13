const source = require('rfr');

const { changeRole, findRole } = source('bot/roles/roles');

function addRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, 'add');
}

function removeRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, 'remove');
}

module.exports = {
    addRoleReactionHandler,
    removeRoleReactionHandler,
};
