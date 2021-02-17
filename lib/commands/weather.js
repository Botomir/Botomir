// weather.js
// ==========

const weather = require('weather-promise');
const source = require('rfr');

const { splitStringBySpace } = source('lib/commands/commandUtilities');
const { Settings } = source('lib/database/models/settings');

const logger = source('lib/utils/logger');

function weatherEmbedMessage(result) {
    return {
        color: 0x0099ff,
        title: 'Weather',
        fields: [
            {
                name: 'Location',
                value: result[0].location.name,
            },
            {
                name: 'Date',
                value: result[0].current.date,
            },
            {
                name: 'Overview',
                value: result[0].current.skytext,
                inline: true,
            },
            {
                name: 'Temperature',
                value: result[0].current.temperature,
                inline: true,
            },
            {
                name: 'Feels Like',
                value: result[0].current.feelslike,
                inline: true,
            },
            {
                name: 'Humidity',
                value: result[0].current.humidity,
                inline: true,
            },
            {
                name: 'Windspeed',
                value: result[0].current.windspeed,
                inline: true,
            },
            {
                name: 'Low',
                value: result[0].forecast[0].low,
                inline: true,
            },
            {
                name: 'High',
                value: result[0].forecast[0].high,
                inline: true,
            },
        ],
    };
}

function renderMessage(result) {
    if (result.length === 0) return 'Error: counld not find specified city'; // In case API returns empty array
    return weatherEmbedMessage(result);
}

function determineCity(message, defaultLocation) {
    const messageArr = splitStringBySpace(message.content);

    if (messageArr.length > 1) {
        return `${messageArr[1]}, ON`;
    }

    return defaultLocation;
}

function sendWeather(message, result) {
    message.channel.send({
        embed: renderMessage(result),
    })
        .then((r) => logger.log(`Successfully completed weather command: ${r}`))
        .catch((e) => logger.log(`Error: could not execute weather command: ${e}`));
}

function weatherCommand(message) {
    Settings.getServerSettings(message.guild.id)
        .then((config) => weather.find({
            search: determineCity(message, config.weatherLocation),
            degreeType: config.tempUnit,
        }))
        .then((result) => sendWeather(message, result))
        .catch((err) => logger.log(err));
}

exports.weatherCommand = weatherCommand;
