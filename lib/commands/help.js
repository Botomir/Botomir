// help.js
// =======
const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const exampleEmbed = {
    color: 0x0099ff,
    author: {
        name: 'Botomir Commands',
        icon_url: 'https://i.imgur.com/wSTFkRM.png',
    },
    fields: [
        {
            name: 'ping',
            value: 'checks if the bot is active',
        },
        {
            name: 'role name-of-role',
            value: 'assigns role to caller',
        },
        {
            name: 'remove name-of-role',
            value: 'removes role from caller',
        },
        {
            name: 'give @user name-of-role',
            value: 'assigns role to user',
        },
        {
            name: 'revoke @user name-of-role',
            value: 'removes role from user',
        },
        {
            name: 'meme',
            value: 'sends a random meme',
        },
        {
            name: 'puppy',
            value: 'puppy pic!',
        },
        {
            name: 'cute',
            value: 'sends an image of a cute animal',
        },
        {
            name: 'reddit subreddit',
            value: 'pulls post from specified subreddit',
        },
        {
            name: 'mental-health',
            value: 'sends mental health resources',
        },
        {
            name: 'weather',
            value: 'checks if the bot is active',
        },
        {
            name: 'createplaylist <time period>',
            value: 'create a spotify playlist',
        },
        {
            name: 'authspotify',
            value: 'authenticate the discord bot with spotify',
        },
    ],
    timestamp: new Date(),
    footer: {
        text: 'For any questions contact @Colonel Pineapple#3164',
    },
};

function helpCommand(message) {
    sendMessage(message.channel, {
        embed: exampleEmbed,
    });
}

exports.helpCommand = helpCommand;
