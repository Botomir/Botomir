// botCommands.js
// ==============
const randomPuppy = require('random-puppy');

module.exports = {
    commandHandler: function (message) {
        if (message.content.toLowerCase().startsWith("!ping")) {
            pingCommand(message);
        } else if (message.content.toLowerCase().startsWith("!help")) {
            helpCommand(message);
        } else if (message.content.toLowerCase().startsWith("!role")) {
            role_command(message);
        } else if (message.content.toLowerCase().startsWith("!remove")) {
            remove_command(message);
        } else if (message.content.toLowerCase().startsWith("!puppy")) {
            puppy_command(message);
        }
    }
};

function helpCommand(message) {
    message.channel.send("###############################################\n" +
        "                Welcome to Help                 \n" +
        "You can use the following commands:             \n" +
        "!ping = checks if the bot is alive              \n" +
        "!role @role = assigns @role to caller           \n" +
        "!role @user @role = assigns @role to @user      \n" +
        "!remove @role = removes @role from caller       \n" +
        "!remove @user @role = removes @role from @user  \n" +
        "!puppy = special surprise :]                    \n" +
        "!help = I think you can figure this out         \n" +
        "################################################\n" +
        "Contact @Colonel Pineapple#3164 for questions   \n" +
        "################################################");
}

function pingCommand(message) {
    message.channel.send("Pong");
}

function role_command(message) {
    let member = getMember(message);
    let role = getRole(message);

    if (!role) {
        invalidRoleErrorHandler(message);
        console.log("Error: role not found");
    } else {
        addMemberRole(member, role, message);
    }
}

function remove_command(message) {
    let member = getMember(message);
    let role = getRole(message);

    if (!role) {
        invalidRoleErrorHandler(message);
        console.log("Error: role not found");
    } else {
        removeMemberRole(member, role, message);
    }
}

function puppy_command(message) {
    randomPuppy()
        .then(url => {
            message.channel.send(url)
                .then(r => console.log("Successfully sent puppy pic: " + r))
        })
}

// Helper Functions

function addMemberRole(member, role, message) {
    member.roles.add(role);
    message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + member.user.username + "\`");
}

function removeMemberRole(member, role, message) {
    member.roles.remove(role);
    message.channel.send("Successfully removed role \`" + role.name + "\` to user \`" + member.user.username + "\`");
}

function getMember(message) {
    let str1Id = trimDiscordID((splitStringBySpace(message))[1]);

    let member = message.guild.members.cache.find(m => m.user.id === str1Id);
    // If not a member must be self call
    if (!member) {
        member = message.member
    }

    return member;
}

function getRole(message) {
    let str1Id = trimDiscordID((splitStringBySpace(message))[1]);
    let str2Id = trimDiscordID((splitStringBySpace(message))[2]);

    // If second str is null then self call
    if (str2Id) {
        return message.guild.roles.cache.find(r => r.id === str2Id);
    } else {
        return message.guild.roles.cache.find(r => r.id === str1Id);
    }
}

function invalidRoleErrorHandler(message) {
    message.channel.send("Error: role not found").then(r => console.log("Error: role not found"));
}

function splitStringBySpace(message) {
    return message.content.split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0;
    });
}

function trimDiscordID(string) {
    if (!string) return string;
    return string.substring(3, string.length - 1);
}