// help.js
// =======

function helpCommand(message, botCommand) {
    message.channel.send(helpMessage(botCommand))
        .then(r => console.log("Successfully completed help command: " + r))
        .catch(e => console.log("Error: could not execute help command: " + e));
}

function helpMessage(botCommand) {
    return "############################################################\n" +
        "                           Welcome to Help                         \n" +
        "You can use the following commands:                                \n" +
        botCommand + "ping = checks if the bot is alive                     \n" +
        botCommand + "role @role = assigns @role to caller                  \n" +
        botCommand + "role @user @role = assigns @role to @user             \n" +
        botCommand + "remove @role = removes @role from caller              \n" +
        botCommand + "remove @user @role = removes @role from @user         \n" +
        botCommand + "reddit subreddit = pulls post from specified subreddit\n" +
        botCommand + "meme = sends a random meme                            \n" +
        botCommand + "cute = sends an image of a cute animal                \n" +
        botCommand + "puppy = puppy pic!                                    \n" +
        botCommand + "mental-health = mental health resources               \n" +
        botCommand + "nickname name = set self nickname                     \n" +
        botCommand + "weather = get weather                                 \n" +
        botCommand + "help = I think you can figure this out                \n" +
        "############################################################       \n" +
        "Contact @Colonel Pineapple#3164 for questions                      \n" +
        "############################################################       \n"
}

module.exports = {
    helpCommand: helpCommand,
    helpMessage: helpMessage
};
