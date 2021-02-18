const emojiRegex = require('emoji-regex/RGI_Emoji.js');
const source = require('rfr');

const { Role } = source('lib/database/models/role');

function parseEmoji(text) {
    const discordRegex = /^<:([^:]+):[0-9]+>$/;

    const parse = discordRegex.exec(text);
    if (parse !== null && parse.length === 2) return parse[1].trim();

    const unicdode = emojiRegex().exec(text);
    return unicdode !== null ? unicdode[0] : null;
}

function removeRoleHeader(text) {
    const parts = text.split('\n\n');

    return parts.length > 1 ? parts.slice(1).join('\n\n').trim() : '';
}

// return a list of Role objects, that is missing the serverID
function parseRoleMessage(text) {
    const roleRegex = /(.*):([^:]*)/;

    const roleText = removeRoleHeader(text);
    if (roleText === '') return [];

    return roleText.split('\n')
        .map((l) => roleRegex.exec(l.trim()))
        .filter((p) => p !== null && p.length === 3)
        .map((r) => new Role()
            .setEmoji(parseEmoji(r[1].trim()))
            .setRole(r[2].trim()));
}

module.exports = {
    parseRoleMessage,
};
