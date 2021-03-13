const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function setPlaylistDescriptionCommand(message, args, config) {
    return config.setPlaylistDescription(args.join(' '))
        .save()
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
    docs: `#### Set playlist description
- Command: \`!set-playlist-description\`
- Returns: description of playlist Botomir will save songs to is set and a success or failure message is sent
- Example usage:
\`\`\`
User
> !set-playlist-description Songs from my Discord serve

Botomir
> Settings updated.
\`\`\``,
};
