require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Bot is connected to Discord!");

    client.guilds.fetch(process.env.DISCORD_GUILD_ID)
        .then(guild =>
            console.log("Connected to server: " + guild.name + ", id: " + guild.id +
                        "\nMember Count: " + guild.memberCount))
        .catch(console.error);
});

client.on('message', message => {
    if (message.author.bot) return;

    console.log(message.content);

    if (message.content === "!ping") {
        message.channel.send("Pong");
    }

    if (message.content === "!role") {
        const role = message.guild.roles.cache.find(r => r.name === "test");
        if (role){
            if(message.member.roles.cache.find(r => r.id === role.id)) {
                message.channel.send("You already have the role")
            } else {
                message.member.roles.add(role);
                message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + message.member.user.username + "\`");
            }
        } else {
            message.channel.send("Error: role not found");
            console.log("Error: role not found");
        }
    }

    if (message.content.startsWith("!role")) {
        const messageArr = message.content.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        console.log(messageArr);

        let str1Id = messageArr[1].substring(3, messageArr[1].length-1);
        let str2Id = null;
        if (messageArr[2]) {
            str2Id = messageArr[2].substring(3, messageArr[2].length-1);
        }

        let member = message.guild.members.cache.find(m => m.user.id === str1Id);
        if (!member) member = message.guild.members.cache.find(m => m.user.id === str2Id);
        if (!member && messageArr.length > 2) {
            console.log("Error: invalid user submitted");
            message.channel.send("Error: user not found");
            return;
        } else if (!member) {
            member = message.member;
        }

        let role = message.guild.roles.cache.find(r => r.id === str2Id);
        console.log(role);
        if (!role) role = message.guild.roles.cache.find(r => r.id === str1Id);
        console.log(role);

        if (role) {
            console.log(member.user.username);
            console.log(role.name);

            member.roles.add(role);
            message.channel.send("Successfully added role \`" + role.name + "\` to user \`" + member.user.username + "\`");
        } else {
            message.channel.send("Error: role not found");
            console.log("Error: role not found");
        }
    }
});

client.on("error", err => {
    console.log("Error: bot encounterd error | " + err);
    client.login(process.env.DISCORD_TOKEN);
});

client.login(process.env.DISCORD_TOKEN);
