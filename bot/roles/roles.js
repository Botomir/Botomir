const source = require('rfr');

const { Statistics, EventTypes } = source('models/statistics');

const logger = source('bot/utils/logger');

const Mode = Object.freeze({
    ADD: 'added',
    REMOVE: 'removed',
});

function recordRoleStats(serverID, mode) {
    return new Statistics()
        .setGuild(serverID)
        .setEvent(mode === Mode.ADD ? EventTypes.ROLE_ASSIGNED : EventTypes.ROLE_REMOVED)
        .save()
        .then(() => logger.info('statistics saved'))
        .catch((e) => logger.error('failed to save statistics', e));
}

function changeRole(member, role, mode, unassignable = []) {
    return new Promise(((resolve, reject) => {
        if (unassignable.includes(role.name)) {
            reject(new Error(`attempting to change unassaignable role '${role.name}'`));
        } else {
            resolve(mode === Mode.ADD ? member.roles.add(role) : member.roles.remove(role));
        }
    }))
        .then((r) => logger.info(`Successfully ${mode} member role:`, r))
        .then(() => recordRoleStats(member.guild.id, mode));
}

module.exports = {
    changeRole,
    Mode,
};
