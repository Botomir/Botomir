const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function setPlaylistNameCommand(message, args, config) {
    return config.setPlaylistName(args.join(' '))
        .save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-playlist-name',
    botAdmin: true,
    description: 'Spotify playlist generation name',
    usage: '<name>',
    aliases: [],
    execute: setPlaylistNameCommand,
    docs: '#### Set playlist name\n\n'
        + '- Command: `!set-playlist-name`\n'
        + '- Returns: name of playlist Botomir will save songs to is set and a success or failure message is sent\n'
        + '- Example usage: \n'
        + '  - `!set-playlist-name An Awesome Discord Playlist`\n'
        + '```\n'
        + 'User\n'
        + '> !set-playlist-name An Awesome Discord Playlist\n\n'
        + 'Botomir\n'
        + '> Settings updated.\n'
        + '```',
};
