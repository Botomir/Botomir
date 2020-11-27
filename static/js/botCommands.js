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
        } else if (message.content.toLowerCase().startsWith("!mental-health")) {
            mental_health_commands(message);
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
        "!mental-health = mental health resources        \n" +
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
        console.log("Error (botCommands): role not found");
    } else {
        addMemberRole(member, role, message);
    }
}

function remove_command(message) {
    let member = getMember(message);
    let role = getRole(message);

    if (!role) {
        invalidRoleErrorHandler(message);
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

function mental_health_commands(message) {
    message.channel.send("Mental health resources: https://www.ccmhs-ccsms.ca/mental-health-resources-1\n" +
                                "Mental health services: https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html\n" +
                                "Information on mental illnesses, disorders and diseases: https://www.canada.ca/en/public-health/topics/mental-illness.html\n" +
                                "About suicide, prevention, risk factors, how to get help when you or someone you know is in need: https://www.canada.ca/en/public-health/services/suicide-prevention.html\n" +
                                "Information on mental health and ways to improve it at work and in your daily life: https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html\n");
}

// Helper Functions

function addMemberRole(member, role, message) {
    if (role.name !== "admin") {
        member.roles.add(role);
        message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + member.user.username + "\`");
    } else {
        message.channel.send("Error (botCommands): cannot give admin role");
    }
}

function removeMemberRole(member, role, message) {
    if (role.name !== "admin") {
        member.roles.remove(role);
        message.channel.send("Successfully removed role \`" + role.name + "\` to user \`" + member.user.username + "\`");
    } else {
        message.channel.send("Error (botCommands): cannot remove admin role");
    }
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
    message.channel.send("Error: role not found").then(r => console.log("Error (botCommands): role not found"));
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