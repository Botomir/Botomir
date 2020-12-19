const source = require('rfr');

const logger = source('lib/utils/logger');

function removeRole(member, role) {
    member.roles.remove(role)
        .then((r) => logger.log(`Successfully removed member role: ${r}`))
        .catch((e) => logger.log(`Error: could not remove member role: ${e}`));
}

function addRole(member, role) {
    member.roles.add(role)
        .then((r) => logger.log(`Successfully added member role: ${r}`))
        .catch((e) => logger.log(`Error: could not give member role: ${e}`));
}

function findRole(member, roleName) {
    return member.guild.roles.cache.find((r) => r.name === roleName);
}

module.exports = {
    addRole,
    removeRole,
    findRole,
};
