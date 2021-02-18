// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function setPlaylistNameCommand(message, args) {
    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.setPlaylistName(args.join(' ')).save())
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err}`));
}

module.exports = {
    args: 1,
    name: 'set-playlist-name',
    botAdmin: true,
    description: 'Spotify playlist generation name',
    usage: '<name>',
    aliases: [],
    execute: setPlaylistNameCommand,
};
