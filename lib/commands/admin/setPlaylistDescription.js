// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function setPlaylistDescriptionCommand(message, args) {
    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.setPlaylistDescription(args.join(' ')).save())
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
