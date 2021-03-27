const source = require('rfr');
const moment = require('moment');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
    'mondays', 'tuesdays', 'wednesdays', 'thursdays', 'fridays', 'saturdays', 'sundays'];
// TODO make this checker better
function checkTimePeriod(timePeriod) {
    const parts = timePeriod.toLowerCase().split(' ');

    return days.includes(parts[0]) && parts[1] === 'at';
}

function scheduleMessage(message, args) {
    const guildID = message.guild.id;
    const channelID = message.channel.id;

    const parts = args.join(' ').split('\n');
    if (parts.length < 2) {
        return sendMessage(message.channel, 'missing options, you need to specify the time on the first line and the message on the next');
    }

    const timePeriod = parts.shift();
    const scheduledText = parts.join('\n');

    if (!checkTimePeriod(timePeriod)) {
        logger.warn(`tied to schedule a message with invalid time string '${timePeriod}'`);
        return sendMessage(message.channel, 'hmmm... Something does not look right with that format, make sure the date formatted as `<day of the week> at <time of the date>...`');
    }

    const job = agenda.create('schedule message', {
        serverID: guildID, channelID, message: scheduledText,
    });
    job.repeatAt(timePeriod);
    job.computeNextRunAt();
    const nextRun = job.attrs.nextRunAt;
    job.save();

    return sendMessage(message.channel, `Your message is scheduled to be sent ${moment(nextRun).fromNow()}`);
}

module.exports = {
    args: 4,
    name: 'schedule',
    botAdmin: false,
    description: 'Schedule a recuring message to be sent to the channel that this is called from',
    usage: '<day of the week> at <time>\n<some message to be sent>',
    aliases: [],
    execute: scheduleMessage,
    docs: `#### Schedule Message
- Command: \`schedule\`
- Returns: Schedules a message to be sent periodicly in the channel that the command is called from.
- Example usage:
\`\`\`
User
> !scheduler thursdays at 6:00pm
Hey everyeryone, remember we have DND soon!

Botomir
> Message has been scheduled to be sent on Thurdsay March 25th at 6:00pm.

......
Thursdat at 6:
Botomir
> Hey everyeryone, remember we have DND soon!
\`\`\``,
};
