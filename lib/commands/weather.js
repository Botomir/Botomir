// weather.js
// ==========

const weather = require('weather-js');
const source = require('rfr');

const {degreeType, defaultCity} = source('config.json');
const {splitStringBySpace} = source('lib/commands/commandUtilities');

function weatherCommand(message) {
    weather.find({search: determineCity(message), degreeType: degreeType}, function (err, result) {
        err? console.log(err) : sendWeather(message, result);
    });
}

function determineCity(message) {
    let messageArr = splitStringBySpace(message.content);
    if (messageArr.length > 1) {
        return messageArr[1] + ', ON';
    } else {
        return defaultCity;
    }
}

function sendWeather(message, result) {
    message.channel.send(renderMessage(result))
        .then(r => console.log('Successfully completed weather command: ' + r))
        .catch(e => console.log('Error: could not execute weather command: ' + e));
}

function renderMessage(result) {
    if (result.length === 0) return 'Error: counld not find specified city';     // In case API returns empty array
    
    return ('The weather in `' + result[0].location.name +
        '` on `' + result[0].current.date +
        '` is  `' + result[0].current.skytext +
        '` at `' + result[0].current.temperature +
        '°C`. It feels like `' + result[0].current.feelslike + '°C`, with humidity of `' +
        result[0].current.humidity + '` and windspeed of `' + result[0].current.windspeed +
        '`. The forecast calls for a low of `' + result[0].forecast[0].low + '°C` and a low of `' +
        result[0].forecast[0].low + '°C` and a high `' + result[0].forecast[0].high + '°C`.');
}

exports.weatherCommand = weatherCommand;
