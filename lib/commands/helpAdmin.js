// help.js
// =======
const source = require('rfr');
const {sendMessage} = source('lib/utils/util');

const adminHelpEmbed = {
    color: 0x0099ff,
    author: {
        name: 'Botomir Admin Commands',
        icon_url: 'https://i.imgur.com/wSTFkRM.png',
    },
    description: `Requires \`botomir-admin\` role`,
    fields: [
        {
            name: `set-roles <message link>`,
            value: 'autogenerate role mappings',
        },
        {
            name: 'add-meme-sub <subreddit name>',
            value: 'add subreddit to get memes from',
        },
        {
            name: 'add-cute-sub <subreddit name>',
            value: 'add subreddit to get cute animal pictures from',
        },
        {
            name: 'set-playlist-name <name>',
            value: 'Spotify playlist generation name',
        },
        {
            name: 'set-playlist-description <message>',
            value: 'playlist description to set',
        },
        {
            name: 'set-command-prefix <character>',
            value: 'change the bot command prefix',
        },
        {
            name: 'add-goodbot <message>',
            value: 'add goodbot response',
        },
        {
            name: 'add-badbot <message>',
            value: 'add badbot response',
        }
    ],
    timestamp: new Date(),
    footer: {
        text: 'For any questions contact @Colonel Pineapple#3164',
    },
};

function helpAdminCommand(message, botCommand) {
    sendMessage(message.channel, {embed: adminHelpEmbed});
}

exports.helpAdminCommand = helpAdminCommand;
