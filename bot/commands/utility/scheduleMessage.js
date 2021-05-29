const source = require('rfr');
const moment = require('moment');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

// takes a crontab formatted string 6+ arguments
// minute, hour, day of month, month, day of week
function scheduleMessage(message, args, config) {
    const guildID = message.guild.id;
    const channelID = message.channel.id;

    const parts = args.join(' ').split('\n');
    if (parts.length < 2) {
        return sendMessage(message.channel, 'missing options, you need to specify the time on the first line and the message on the next');
    }

    const timePeriod = parts.shift();
    const scheduledText = parts.join('\n');

    const job = agenda.create('schedule message', {
        serverID: guildID, channelID, message: scheduledText,
    });
    const res = job.repeatEvery(timePeriod, {
        skipImmediate: true,
        timezone: config.timezone,
    });
    const nextRun = job.attrs.nextRunAt;

    if (!res.attrs.nextRunAt) {
        logger.error(`Can not schedule message: ${res.attrs.failReason}`);
        return sendMessage(message.channel, 'Can not schedule message: Invalid repeat format');
    }

    job.save();

    return sendMessage(message.channel, `Your message is scheduled to be sent ${moment(nextRun).calendar()}`);
}

module.exports = {
    args: 6,
    name: 'schedule',
    botAdmin: false,
    description: 'Schedule a recurring message to be sent to the channel that this is called from, uses [cron](https://crontab.guru/) formatted times.',
    usage: '<crontab string>\n<some message to be sent>',
    aliases: [],
    execute: scheduleMessage,
    docs: `#### Schedule Message
- Command: \`schedule\`
- Returns: Schedules a message to be sent periodicity in the channel that the command is called from.
- This uses [Crontab](https://crontab.guru/) formatted time strings, they are a little bit more
  confusing to write but they are very powerful and can be very specific.
- Example usage:
\`\`\`
User
> !schedule 0 6 * * THU
Hey everyeryone, remember we have DND soon!

Botomir
> Message has been scheduled to be sent on Thursday March 25th at 6:00pm.

......
Thursday at 6:
Botomir
> Hey everyeryone, remember we have DND soon!
\`\`\``,
};
