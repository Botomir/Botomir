const source = require('rfr');
const moment = require('moment');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

// takes a crontab formatted string 6+ arguments, first
function reminderHandler(message, args) {
    const guildID = message.guild.id;
    const channelID = message.channel.id;

    const parts = args.join(' ').split('\n');
    if (parts.length < 2) {
        return sendMessage(message.channel, 'missing options, you need to specify the time on the first line and the message on the next');
    }

    const timePeriod = parts.shift();
    const scheduledText = `Hey <@${message.author}>! Don't forget: ${parts.join('\n')}\nhttps://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;

    const job = agenda.create('schedule message', {
        serverID: guildID,
        channelID,
        message: scheduledText,
    });
    const res = job.schedule(timePeriod);
    const nextRun = job.attrs.nextRunAt;

    if (!res.attrs.nextRunAt) {
        logger.error(`Can not schedule reminder: ${res.attrs.failReason}`);
        return sendMessage(message.channel, 'Sorry I cant figure out when you want me to remind you about that');
    }

    job.save();

    return sendMessage(message.channel, `I will send you the reminder on ${moment(nextRun).calendar()}`);
}

module.exports = {
    args: 2,
    name: 'remind',
    botAdmin: false,
    description: 'Send a reminder message at a scheduled time.',
    usage: '<time for the reminder>\n<some message to be sent>',
    aliases: [],
    execute: reminderHandler,
    docs: `#### Remind Message
- Command: \`remind\`
- Returns: Schedules a message to be sent later to remind you about this one.
- This uses [Crontab](https://crontab.guru/) formatted time strings, they are a little bit more
  confusing to write but they are very powerful and can be very specific.
- Example usage:
\`\`\`
User
> !remind in 3 hours
look at this later

Botomir
> I will send you the reminder on Thursday March 25th at 6:00pm.

......
Thursday at 6:
Botomir
> Hey @user! Don't forget: look at this later.

https://discord.com/channels/12345/124/098765
\`\`\``,
};
