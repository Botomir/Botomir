// help.js
// =======

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function helpMessage(botCommand) {
    return `############################################################
                           Welcome to Help
You can use the following commands:
${botCommand}ping = checks if the bot is alive
${botCommand}role @role = assigns @role to caller
${botCommand}role @user @role = assigns @role to @user
${botCommand}remove @role = removes @role from caller
${botCommand}remove @user @role = removes @role from @user
${botCommand}reddit subreddit = pulls post from specified subreddit
${botCommand}meme = sends a random meme
${botCommand}cute = sends an image of a cute animal
${botCommand}puppy = puppy pic!
${botCommand}mental-health = mental health resources
${botCommand}nickname name = set self nickname
${botCommand}weather = get weather
${botCommand}createplaylist <time period> = create a spotify playlist
${botCommand}authspotify = authenticate the discord bot with spotify
${botCommand}help = I think you can figure this out
############################################################
             Admin Commands (must have \`botmir-admin\` role)
${botCommand}set-roles <message link> = autogenerate the role mappings
${botCommand}add-meme-sub <subreddit name> = subreddit to get memes from
${botCommand}add-cute-sub <subreddit name> = subreddit to get memes from
${botCommand}set-playlist-name <name> = spotify playlist generation name
${botCommand}set-playlist-description <message> = playlist description to set
${botCommand}set-command-prefix <character> = change the bot command prefix
${botCommand}add-goodbot <message> = add goodbot response
${botCommand}add-badbot <message> = add badbot response
############################################################
Contact @Colonel Pineapple#3164 for questions
############################################################`;
}

function helpCommand(message, botCommand) {
    sendMessage(message.channel, helpMessage(botCommand));
}

exports.helpCommand = helpCommand;
