// commandUtilities.js
// ===================

const source = require("rfr");
const {sendMessage} = source("lib/utils/util");


// this will remove all whitespace beteen tokens
function splitStringBySpace(string) {
    return string.split(/\s+/).filter(s => s.length !== 0);
}

function getMember(guild, string) {
    let str1Id = trimDiscordID(string);
    return guild.members.cache.find(m => m.user.id === str1Id);
}

function getRole(guild, string) {
    let str1Id = trimDiscordID(string);
    return guild.roles.cache.find(r => r.id === str1Id);
}

// Roles Discord Bot does not have access to
function filterRole(role) {
    if (!role || role.name === "admin" || !role.editable) {
        return null;
    } else {
        return role;
    }
}

function invalidRoleErrorHandler(message) {
    sendMessage(message.channel, "Error: role not found");
}

function trimDiscordID(string) {
    if (!string) return undefined;

    let idRegex = /<[@#][&!]?([0-9]+)>/;
    let res = idRegex.exec(string);
    return !res ? undefined : res[1];
}

// remove the command from the string
function discardCommand(string) {
    let firstSpace = string.indexOf(' ');
    return firstSpace === -1 ? '' : string.slice(firstSpace).trim()
}

module.exports = {
    splitStringBySpace: splitStringBySpace,
    getMember: getMember,
    getRole: getRole,
    filterRole: filterRole,
    invalidRoleErrorHandler: invalidRoleErrorHandler,
    discardCommand: discardCommand,
};
