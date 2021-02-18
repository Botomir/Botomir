// giveRole.js
// ===========

const source = require('rfr');
const weather = require('weather-promise');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');

const logger = source('lib/utils/logger');

function weatherEmbedMessage(result) {
    return {
        embed:
        {
            color: 0x0099ff,
            title: 'Weather',
            fields: [
                {
                    name: 'Location',
                    value: result.location.name,
                },
                {
                    name: 'Date',
                    value: result.current.date,
                },
                {
                    name: 'Overview',
                    value: result.current.skytext,
                    inline: true,
                },
                {
                    name: 'Temperature',
                    value: result.current.temperature,
                    inline: true,
                },
                {
                    name: 'Feels Like',
                    value: result.current.feelslike,
                    inline: true,
                },
                {
                    name: 'Humidity',
                    value: result.current.humidity,
                    inline: true,
                },
                {
                    name: 'Windspeed',
                    value: result.current.windspeed,
                    inline: true,
                },
                {
                    name: 'Low',
                    value: result.forecast[0].low,
                    inline: true,
                },
                {
                    name: 'High',
                    value: result.forecast[0].high,
                    inline: true,
                },
            ],
        },
    };
}

function sendWeather(message, result) {
    const payload = result.length !== 0 ? weatherEmbedMessage(result[0]) : 'Error: counld not find specified city';
    sendMessage(message.channel, payload);
}

function weatherCommand(message, args) {
    const city = args.length > 1 ? `${args[0]}, ON` : undefined;

    Settings.getServerSettings(message.guild.id)
        .then((config) => weather.find({
            search: city || config.weatherLocation,
            degreeType: config.tempUnit,
        }))
        .then((result) => sendWeather(message, result))
        .catch((err) => logger.log(err));
}

module.exports = {
    args: false,
    name: 'weather',
    botAdmin: false,
    description: 'Gets the weather information for the city, or a default location for the server',
    usage: '[city]',
    aliases: [],
    execute: weatherCommand,
};
