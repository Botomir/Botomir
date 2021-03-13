const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

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
    docs: `#### Set playlist name
- Command: \`!set-playlist-name\`
- Returns: name of playlist Botomir will save songs to is set and a success or failure message is sent
- Example usage:
\`\`\`
User
> !set-playlist-name An Awesome Discord Playlist

Botomir
> Settings updated.
\`\`\``,
};
