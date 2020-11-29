// botCommands.js
// ==============

const weather = require('weather-js');
const randomPuppy = require('random-puppy');
const { meme } = require('memejs');
const botCommand = "!";
const defaultSubreddit = "dankmemes";
const defaultCity = "Toronto, ON";

module.exports = {
    commandHandler: async function (message) {
        if (containsCommand(message,  "ping")) {
            await pingCommand(message);
        } else if (containsCommand(message, "help")) {
           await helpCommand(message);
        } else if (containsCommand(message, "role")) {
            await role_command(message);
        } else if (containsCommand(message, "remove")) {
            await remove_command(message);
        } else if (containsCommand(message,"puppy")) {
            puppy_command(message);
        } else if (containsCommand(message,"mental-health")) {
            await mental_health_command(message);
        } else if (containsCommand(message,  "meme")) {
            await meme_command(message);
        } else if (containsCommand(message, "weather")) {
            await weather_command(message);
        }
    }
};

async function helpCommand(message) {
    await message.channel.send("###############################################\n" +
        "                     Welcome to Help                     \n" +
        "You can use the following commands:                      \n" +
        botCommand + "ping = checks if the bot is alive              \n" +
        botCommand + "role @role = assigns @role to caller           \n" +
        botCommand + "role @user @role = assigns @role to @user      \n" +
        botCommand + "remove @role = removes @role from caller       \n" +
        botCommand + "remove @user @role = removes @role from @user  \n" +
        botCommand + "puppy = special surprise :]                    \n" +
        botCommand + "mental-health = mental health resources        \n" +
        botCommand + "help = I think you can figure this out         \n" +
        "################################################\n" +
        "Contact @Colonel Pineapple#3164 for questions   \n" +
        "################################################");
}

async function pingCommand(message) {
    await message.channel.send("Pong");
}

async function role_command(message) {
    let member = getMember(message);
    let role = filterRole(getRole(message));

    if (!role) {
        invalidRoleErrorHandler(message);
        console.log("Error (botCommands): role not found");
    } else {
        await addMemberRole(member, role, message);
        await message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + member.user.username + "\`");
    }
}

async function remove_command(message) {
    let member = getMember(message);
    let role = filterRole(getRole(message));

    if (!role) {
        invalidRoleErrorHandler(message);
    } else {
        await removeMemberRole(member, role, message).then(r => console.log(r));
        await message.channel.send("Successfully removed role \`" + role.name + "\` to user \`" + member.user.username + "\`");
    }
}

function puppy_command(message) {
    randomPuppy()
        .then(url => {
            message.channel.send(url)
                .then(r => console.log("Successfully sent puppy pic: " + r))
        })
}

async function mental_health_command(message) {
    await message.channel.send("Mental health resources: https://www.ccmhs-ccsms.ca/mental-health-resources-1\n" +
        "Mental health services: https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html\n" +
        "Information on mental illnesses, disorders and diseases: https://www.canada.ca/en/public-health/topics/mental-illness.html\n" +
        "About suicide, prevention, risk factors, how to get help when you or someone you know is in need: https://www.canada.ca/en/public-health/services/suicide-prevention.html\n" +
        "Information on mental health and ways to improve it at work and in your daily life: https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html\n");
}

async function meme_command(message) {
    let messageArr = splitStringBySpace(message);

    if (messageArr.length === 2) {
        await send_meme(message, messageArr[1])
    } else {
        await send_meme(message, defaultSubreddit)
    }
}

async function weather_command(message) {
    await weather.find({search: defaultCity , degreeType: "C"}, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            message.channel.send("The weather for \`" + result[0].location.name + "\` on \`" +
                result[0].current.date + "\` is  " + result[0].current.skytext + " at " +
                result[0].current.temperature + "°C, and feels like " + result[0].current.feelslike + "°C.");
        }
    });
}


// Helper Functions

function containsCommand(message, command) {
    return message.content.toLowerCase().startsWith(botCommand + command);
}

async function addMemberRole(member, role, message) {
    if (role.name !== "admin") {
        await member.roles.add(role);
    } else {
        await message.channel.send("Error (botCommands): cannot give admin role");
    }
}

async function removeMemberRole(member, role, message) {
    if (role.name !== "admin") {
        await member.roles.remove(role);
    } else {
        await message.channel.send("Error (botCommands): cannot remove admin role");
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

async function send_meme(message, subreddit) {
    await meme(subreddit, function(err, data) {
        if (err) {
            return console.error(err);
        } else {
            console.log(data);
            message.channel.send(data.title + "\n" + data.url);
        }
    });
}

// Roles Botomir does not have access to
function filterRole(role) {
    if (!role || role.name === "admin") {
        return null;
    } else {
        return role;
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