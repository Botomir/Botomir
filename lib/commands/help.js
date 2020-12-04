// help.js
// =======

module.exports = {
    helpCommand: function (message, botCommand) {
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
};