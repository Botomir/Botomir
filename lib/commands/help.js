// help.js
// =======

const source = require("rfr");
const {sendMessage} = source("lib/utils/util");

function helpCommand(message, botCommand) {
    sendMessage(message.channel, helpMessage(botCommand));
}

function helpMessage(botCommand) {
    return "############################################################\n" +
        "                           Welcome to Help                            \n" +
        "You can use the following commands:                                   \n" +
        botCommand + "ping = checks if the bot is alive                        \n" +
        botCommand + "role @role = assigns @role to caller                     \n" +
        botCommand + "role @user @role = assigns @role to @user                \n" +
        botCommand + "remove @role = removes @role from caller                 \n" +
        botCommand + "remove @user @role = removes @role from @user            \n" +
        botCommand + "reddit subreddit = pulls post from specified subreddit   \n" +
        botCommand + "meme = sends a random meme                               \n" +
        botCommand + "cute = sends an image of a cute animal                   \n" +
        botCommand + "puppy = puppy pic!                                       \n" +
        botCommand + "mental-health = mental health resources                  \n" +
        botCommand + "nickname name = set self nickname                        \n" +
        botCommand + "weather = get weather                                    \n" +
        botCommand + "createplaylist <time period> = create a spotify playlist \n" +
        botCommand + "authspotify = authenticate the discord bot with spotify  \n" +
        botCommand + "help = I think you can figure this out                   \n" +
        "############################################################          \n" +
        "Contact @Colonel Pineapple#3164 for questions                         \n" +
        "############################################################          \n"
}

exports.helpCommand = helpCommand;
