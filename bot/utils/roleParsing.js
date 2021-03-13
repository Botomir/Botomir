const emojiRegex = require('emoji-regex/RGI_Emoji.js');

function parseEmoji(text) {
    const discordRegex = /^<:([^:]+):[0-9]+>$/;

    const parse = discordRegex.exec(text);
    if (parse !== null && parse.length === 2) return parse[1].trim();

    const unicdode = emojiRegex().exec(text);
    return unicdode !== null ? unicdode[0] : null;
}

function splitHeader(text) {
    const parts = text.split('---');

    return {
        header: parts.shift().trim(),
        body: parts.join('---').trim(),
    };
}

// returns an object
// { header: str, mappings: [ {emoji: 'str', roleName: 'str', label: 'str'}]
function parseRoleMessage(text) {
    const parts = splitHeader(text);

    const roleRegex = /^\s*((?:<:)?[^:]*(?::[0-9]+>)?)\s*:\s*([^:]*)(?:\s*:\s*(.*))?$/;

    const mappings = parts.body.split('\n')
        .map((l) => roleRegex.exec(l))
        .filter((p) => p !== null && p.length === 4)
        .map((r) => ({
            emoji: parseEmoji(r[1].trim()),
            roleName: r[2].trim(),
            label: r[3] ? r[3].trim() : r[2].trim(),
        }));

    return {
        header: parts.header,
        mappings,
    };
}

module.exports = {
    parseRoleMessage,
};
