const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function setDefaultWeatherLocation(message, args, config) {
    return config.setWeatherLocation(args.join(' ')).save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-weather-location',
    botAdmin: true,
    description: 'sets the default location to get the weather from for the server',
    usage: '<location>',
    aliases: [],
    execute: setDefaultWeatherLocation,
};
