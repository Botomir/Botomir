const source = require('rfr');
const weather = require('weather-promise');

const { sendMessage } = source('bot/utils/util');

const logger = source('bot/utils/logger');

function weatherEmbedMessage(result) {
    return {
        embeds: [
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
        ],
    };
}

function sendWeather(message, result) {
    const payload = result.length !== 0 ? weatherEmbedMessage(result[0]) : 'Error: counld not find specified location';
    sendMessage(message.channel, payload);
}

function weatherCommand(message, args, config) {
    const location = args.length > 1 ? args.join(' ') : config.weatherLocation;

    return weather.find({
        search: location,
        degreeType: config.tempUnit,
    })
        .then((result) => sendWeather(message, result))
        .catch((err) => logger.error(err));
}

module.exports = {
    args: false,
    name: 'weather',
    botAdmin: false,
    description: 'Gets the weather information for the specified location, or a default location for the server',
    usage: '[location]',
    aliases: [],
    execute: weatherCommand,
    docs: `#### Weather
- Command: \`weather\`
- Returns: an embedded message with the weather information for a city
- Example usage:
\`\`\`
User
> !weather

Botomir
> <embedded weather message>
\`\`\``,
};
