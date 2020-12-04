// botCommands.js
// ==============

const weather = require('weather-js');
const { meme: reddit } = require('memejs');

const botCommand = "!";
const defaultSubreddit = "dankmemes";
const defaultCity = "Toronto, ON";

module.exports = {
    commandHandler: function (message) {
        if (containsCommand(message,  "ping")) {
            pingCommand(message);
        } else if (containsCommand(message, "help")) {
            helpCommand(message);
        } else if (containsCommand(message, "role")) {
            role_command(message);
        } else if (containsCommand(message, "remove")) {
            remove_command(message);
        } else if (containsCommand(message,"puppy")) {
            puppy_command(message);
        } else if (containsCommand(message,"mental-health")) {
            mental_health_command(message);
        } else if (containsCommand(message,  "meme")) {
            meme_command(message);
        } else if (containsCommand(message, "weather")) {
            weather_command(message);
        }
    }
};

function helpCommand(message) {
    message.channel.send("###############################################\n" +
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
        "################################################")
        .then(r => console.log("Successfully completed help command - " + r))
        .catch(e => console.log("Error: could not execute help command - " + e));
}

function pingCommand(message) {
    message.channel.send("Pong")
        .then(r => "Successfully completed ping command - " + r)
        .catch(e => "Error: could not execute ping command -" + e);
}

function role_command(message) {
    let member = getMember(message);
    let role = filterRole(getRole(message));

    if (!role) {
        invalidRoleErrorHandler(message);
        console.log("Error (botCommands): role not found");
    } else {
        addMemberRole(member, role, message);
        message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + member.user.username + "\`")
            .then(r => "Successfully sent added role confirmation message - " + r)
            .catch(e => "Error: encountered error when sending added role confirmation message - " + e);
    }
}

function remove_command(message) {
    let member = getMember(message);
    let role = filterRole(getRole(message));

    if (!role) {
        invalidRoleErrorHandler(message);
    } else {
        removeMemberRole(member, role, message).then(r => console.log(r));
        message.channel.send("Successfully removed role \`" + role.name + "\` to user \`" + member.user.username + "\`")
            .then(r => "Successfully sent removed role confirmation message - " + r)
            .catch(e => "Error: encountered error when sending removed role confirmation message - " + e);
    }
}

function puppy_command(message) {
    sendRedditPost(message, "puppy");
}

function mental_health_command(message) {
    message.channel.send("Mental health resources: https://www.ccmhs-ccsms.ca/mental-health-resources-1\n" +
        "Mental health services: https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html\n" +
        "Information on mental illnesses, disorders and diseases: https://www.canada.ca/en/public-health/topics/mental-illness.html\n" +
        "About suicide, prevention, risk factors, how to get help when you or someone you know is in need: https://www.canada.ca/en/public-health/services/suicide-prevention.html\n" +
        "Information on mental health and ways to improve it at work and in your daily life: https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html\n")
        .then(r => "Successfully completed mental-health command - " + r)
        .catch(e => "Error: could not execute mental-health command -" + e);
}

function meme_command(message) {
    let messageArr = splitStringBySpace(message);

    if (messageArr.length === 2) {
        sendRedditPost(message, messageArr[1])
    } else {
        sendRedditPost(message, defaultSubreddit)
    }
}

function weather_command(message) {
    weather.find({search: defaultCity , degreeType: "C"}, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            message.channel.send("The weather for \`" + result[0].location.name + "\` on \`" +
                result[0].current.date + "\` is  " + result[0].current.skytext + " at " +
                result[0].current.temperature + "°C, and feels like " + result[0].current.feelslike + "°C.")
                .then(r => "Successfully completed weather command - " + r)
                .catch(e => "Error: could not execute weather command - " + e);
        }
    });
}


// Helper Functions

function containsCommand(message, command) {
    return message.content.toLowerCase().startsWith(botCommand + command);
}

function addMemberRole(member, role, message) {
    if (role.name !== "admin") {
        member.roles.add(role)
            .then(r => "Successfully added member role - " + r)
            .catch(e => "Error: could not give member role - " + e);;
    } else {
        message.channel.send("Error (botCommands): cannot give admin role")
            .then(r => "Successfully sent add privileged role error message - " + r)
            .catch(e => "Error: could not send add privileged role error message - " + e);
    }
}

function removeMemberRole(member, role, message) {
    if (role.name !== "admin") {
        member.roles.remove(role)
            .then(r => "Successfully removed member role - " + r)
            .catch(e => "Error: could not remove member role - " + e);
    } else {
        message.channel.send("Error (botCommands): cannot remove admin role")
            .then(r => "Successfully completed mental-health command - " + r)
            .catch(e => "Error: could not execute mental-health command -" + e);
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

function sendRedditPost(message, subreddit) {
    reddit(subreddit, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            message.channel.send(data.title + "\n" + data.url)
                .then(r => "Successfully sent Reddit post - " + r)
                .catch(e => "Error: could not send Reddit post -" + e);
        }
    });
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
        .then(r => console.log("Successfully sent role not found error message - " + r))
        .catch(e => console.log("Error: failed to send role not found error message - " + e));
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