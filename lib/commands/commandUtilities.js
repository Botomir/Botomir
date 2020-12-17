// commandUtilities.js
// ===================

// this will remove all whitespace beteen tokens
function splitStringBySpace(string) {
    return string.split(/\s+/).filter((s) => s.length !== 0);
}

function trimDiscordID(string) {
    if (!string) return undefined;

    const idRegex = /<[@#][&!]?([0-9]+)>/;
    const res = idRegex.exec(string);
    return !res ? undefined : res[1];
}

function getMember(guild, string) {
    const str1Id = trimDiscordID(string);
    return guild.members.cache.get(str1Id);
}

function getRole(guild, string) {
    const str1Id = trimDiscordID(string);
    return guild.roles.cache.get(str1Id);
}

// Roles Discord Bot does not have access to
function filterRole(role) {
    if (!role || role.name === 'admin' || !role.editable) {
        return null;
    }
    return role;
}

// remove the command from the string
function discardCommand(string) {
    const firstSpace = string.indexOf(' ');
    return firstSpace === -1 ? '' : string.slice(firstSpace).trim();
}

module.exports = {
    splitStringBySpace,
    getMember,
    getRole,
    filterRole,
    discardCommand,
};
