// commandUtilities.js
// ===================

function splitStringBySpace(message) {
    return message.content.split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0;
    });
}

function getMember(message) {
    let str1Id = trimDiscordID((splitStringBySpace2(message))[1]);
    let member = message.guild.members.cache.find(m => m.user.id === str1Id);

    // If not a member must be self call
    if (!member) {
        member = message.member
    }

    return member;
}

function getRole(message) {
    let str1Id = trimDiscordID((splitStringBySpace2(message))[1]);
    let str2Id = trimDiscordID((splitStringBySpace2(message))[2]);

    // If second str is null then self call
    if (str2Id) {
        return message.guild.roles.cache.find(r => r.id === str2Id);
    } else {
        return message.guild.roles.cache.find(r => r.id === str1Id);
    }
}

// Roles Discord Bot does not have access to
function filterRole(role) {
    if (!role || role.name === "admin") {
        return null;
    } else {
        return role;
    }
}

function invalidRoleErrorHandler(message) {
    message.channel.send("Error: role not found")
        .then(r => console.log("Successfully sent role not found error message: " + r))
        .catch(e => console.log("Error: failed to send role not found error message: " + e));
}

function trimDiscordID(string) {
    if (!string) return string;
    return string.substring(3, string.length - 1);
}

function splitStringBySpace2(message) {
    return message.content.split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0;
    });
}

module.exports = {
    splitStringBySpace: splitStringBySpace,
    getMember: getMember,
    getRole: getRole,
    filterRole: filterRole,
    invalidRoleErrorHandler: invalidRoleErrorHandler,
};
