const source = require('rfr');
// const moment = require('moment');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

function scheduleMessage(message) {
    agenda.jobs({
        'data.serverID': message.guild.id,
    })
        .then((jobs) => {
            logger.info(jobs);
            sendMessage(message.channel, 'there are a bunch of jobs');
        });
}

module.exports = {
    args: 0,
    name: 'scheduled-jobs',
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
