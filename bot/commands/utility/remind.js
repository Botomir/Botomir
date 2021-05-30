const source = require('rfr');
const moment = require('moment');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

// takes a crontab formatted string 6+ arguments, first
function remindHandler(message, args) {
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
    description: 'Send a reminder message at a scheduled time. The date formats must be specified using this [date formats](http://date.js.org/)',
    usage: '<time for the reminder>\n<some message to be sent>',
    aliases: [],
    execute: remindHandler,
    docs: `#### Remind Message
- Command: \`remind\`
- Returns: Schedules a message to be sent at a later time.
- This uses [date formats](http://date.js.org/) specified to say when the reminder message should be sent.
  It is mostly able to identify normal english dates but the date must come before the month. The message
  must be on the second line and can go on for as long as you want.
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
\`\`\`
\`\`\`
User
> !remind in 5:00pm on the 4th of July
look at this later

Botomir
> I will send you the reminder on 07/04/2021.

......
July 4th at 5:
Botomir
> Hey @user! Don't forget: look at this later.

https://discord.com/channels/12345/124/098765
\`\`\``,
};
