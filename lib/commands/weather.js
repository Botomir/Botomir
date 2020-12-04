// weather.js
// ==========

const weather = require('weather-js');

module.exports = {
    weatherCommand: function (message, city) {
        weather.find({search: city, degreeType: "C"}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                message.channel.send("The weather for \`" + result[0].location.name + "\` on \`" +
                    result[0].current.date + "\` is  " + result[0].current.skytext + " at " +
                    result[0].current.temperature + "°C, and feels like " + result[0].current.feelslike + "°C.")
                    .then(r => "Successfully completed weather command - " + r)
                    .catch(e => "Error: could not execute weather command - " + e);
            }
        });
    }
};