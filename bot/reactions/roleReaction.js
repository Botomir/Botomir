const source = require('rfr');

const { changeRole, findRole, Mode } = source('bot/roles/roles');

function addRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, Mode.ADD);
}

function removeRoleReactionHandler(member, roleName) {
    const role = findRole(member, roleName);
    changeRole(member, role, Mode.REMOVE);
}

module.exports = {
    addRoleReactionHandler,
    removeRoleReactionHandler,
};
