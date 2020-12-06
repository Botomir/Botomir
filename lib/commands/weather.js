// weather.js
// ==========

const weather = require('weather-js');
const {degreeType} = require("../../config.json");
// let degreeType = config.temperature;

module.exports = {
    weatherCommand: function (message, city) {
        weather.find({search: city, degreeType: degreeType}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                sendWeather(message, result);
            }
        });
    }
};

function sendWeather(message, result) {
    message.channel.send(renderMessage(result))
        .then(r => console.log("Successfully completed weather command: " + r))
        .catch(e => console.log("Error: could not execute weather command: " + e));
}

function renderMessage(result) {
    return "The weather for \`" + result[0].location.name +
            "\` on \`" + result[0].current.date +
            "\` is  " + result[0].current.skytext +
            " at " + result[0].current.temperature +
            "°C, but feels like " + result[0].current.feelslike + "°C."
}