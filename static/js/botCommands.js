function pingCommand(message) {
    message.channel.send("Pong");
}

function role_command(message) {
    let messageArr = splitStringBySpace(message);
    console.log(messageArr);

    let str1Id = trimDiscordID(messageArr[1]);
    let str2Id = trimDiscordID(messageArr[2]);

    let member = getMember(message, str1Id);
    let role = getRole(message, str1Id, str2Id);

    if (!role) {
        invalidRoleErrorHandler(message);
        console.log("Error: role not found");
    } else {
        giveMemberRole(member, role, message);
        console.log(member.user.username);
        console.log(role.name);
    }
}

function giveMemberRole(member, role, message) {
    member.roles.add(role);
    message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + member.user.username + "\`");
}

function getMember(message, str1Id) {
    let member = message.guild.members.cache.find(m => m.user.id === str1Id);

    // If not a member must be self call
    if (!member) {
        member = message.member
    }

    return member;
}

function getRole(message, str1Id, str2Id) {
    // If second str is null then self call
    if (str2) {
        return message.guild.roles.cache.find(r => r.id === str2Id);
    } else {
        return message.guild.roles.cache.find(r => r.id === str1Id);
    }
}

function invalidRoleErrorHandler(message) {
    message.channel.send("Error: role not found");
}

function splitStringBySpace(message) {
    return message.content.split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0;
    });
}

function trimDiscordID(string) {
    return string.substring(3, string.length - 1);
}