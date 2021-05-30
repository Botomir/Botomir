const source = require('rfr');

const { lookupRoleName } = source('bot/utils/util');

function generateMessageContent(header, mappings) {
    return mappings.reduce((acc, m) => `${acc}\n${m.emoji} : \`${m.label}\``, `${header}\n`);
}

function reactToMessage(message, mappings) {
    return Promise.all(mappings.map((m) => message.react(m.emoji)));
}

function checkRoles(mappings, guild, unassignableRoles) {
    return mappings
        .map((m) => ({
            role: lookupRoleName(guild, m.roleName),
            ...m,
        }))
        .filter((m) => m.role && !unassignableRoles.includes(m.role.name));
}

module.exports = {
    generateMessageContent,
    reactToMessage,
    checkRoles,
};
