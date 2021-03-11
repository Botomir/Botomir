const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

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
    docs: '#### Set playlist description\n\n'
        + '- Command: `!set-playlist-description`\n'
        + '- Returns: description of playlist Botomir will save songs to is set and a success or failure message is sent\n'
        + '- Example usage: \n'
        + '```\n'
        + 'User\n'
        + '> !set-playlist-description Songs from my Discord serve\n\n'
        + 'Botomir\n'
        + '> Settings updated.\n'
        + '```',
};
