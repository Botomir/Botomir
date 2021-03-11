const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function setPlaylistDescriptionCommand(message, args, config) {
    return config.setPlaylistDescription(args.join(' ')).save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-playlist-description',
    botAdmin: true,
    description: 'Spotify playlist description',
    usage: '<description>',
    aliases: [],
    execute: setPlaylistDescriptionCommand,
};
