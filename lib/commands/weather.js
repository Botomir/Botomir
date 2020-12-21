// weather.js
// ==========

const weather = require('weather-promise');
const source = require('rfr');

const { splitStringBySpace } = source('lib/commands/commandUtilities');
const { loadSettings } = source('lib/database/mongoDB');

const logger = source('lib/utils/logger');

function renderMessage(result) {
    if (result.length === 0) return 'Error: counld not find specified city'; // In case API returns empty array

    return (`The weather in \`${result[0].location.name
    }\` on \`${result[0].current.date
    }\` is  \`${result[0].current.skytext
    }\` at \`${result[0].current.temperature
    }°C\`. It feels like \`${result[0].current.feelslike}°C\`, with humidity of \`${
        result[0].current.humidity}\` and windspeed of \`${result[0].current.windspeed
    }\`. The forecast calls for a low of \`${result[0].forecast[0].low}°C\` and a low of \`${
        result[0].forecast[0].low}°C\` and a high \`${result[0].forecast[0].high}°C\`.`);
}

function determineCity(message, defaultLocation) {
    const messageArr = splitStringBySpace(message.content);
    if (messageArr.length > 1) {
        return `${messageArr[1]}, ON`;
    }
    return defaultLocation;
}

function sendWeather(message, result) {
    message.channel.send(renderMessage(result))
        .then((r) => logger.log(`Successfully completed weather command: ${r}`))
        .catch((e) => logger.log(`Error: could not execute weather command: ${e}`));
}

function weatherCommand(message) {

    loadSettings(message.guild.id)
        .then(config => {
            return weather.find({
                search: determineCity(message, config.weather_location),
                degreeType: config.tempature_unit,
            });
        })
        .then((result) => sendWeather(message, result))
        .catch((err) => logger.log(err));
}

exports.weatherCommand = weatherCommand;
