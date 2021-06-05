const source = require('rfr');

const moment = require('moment-timezone');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

function setTimezoneLocation(message, args, config) {
    const zone = args.join(' ');
    if (moment.tz.zone(zone) === null) {
        logger.error(`'${zone}' is not a valid timezone`);
        return sendMessage(message.channel, `'${zone}' is not a valid timezone`);
    }

    return config.setTimezone(zone).save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-timezone',
    botAdmin: true,
    description: 'Sets the server timezone',
    usage: '<location>',
    aliases: [],
    execute: setTimezoneLocation,
    docs: `#### Weather Timezone
- Command: \`set-timezone\`
- Returns: sets server timezone for the scheduled messages and sends success or failure message
- Example usage:
\`\`\`
User
> !set-timezone America/Toronto

Botomir
> Updated settings.
\`\`\``,
};
