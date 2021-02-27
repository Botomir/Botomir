const source = require('rfr');

const { sendMessage, getChannel } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

function setMusicCHannel(message, args) {
    const channel = getChannel(message.guild, args[0]);
    if (!channel) return sendMessage(message.channel, `${args[0]} is not a valid channel`);

    return Settings.getServerSettings(message.guild.id)
        .then((config) => config.setMusicChannel(channel.id).save())
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-music-channel',
    botAdmin: true,
    description: 'set the channel that should be watched for spotufy tracks',
    usage: '<channel>',
    aliases: [],
    execute: setMusicCHannel,
};
