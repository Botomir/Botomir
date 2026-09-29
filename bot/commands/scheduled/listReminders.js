const source = require('rfr');
const moment = require('moment-timezone');
// const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

function listReminders(message, args, config) {
    agenda.queryJobs({
        data: {
            serverID: message.guild.id,
        },
    })
        .then(({ jobs }) => {
            const list = jobs.filter((j) => j.nextRunAt != null && !j.repeatInterval)
                /* eslint-disable no-underscore-dangle */
                .reduce(
                    (acc, j) => `${acc}\njobID: ${j._id}\n${moment(j.nextRunAt).tz(config.timezone).calendar()}\nChannel: <#${j.data.channelID}>\nText: \`${j.data.message}\`\n--------\n`,
                    'I currently have the following recurring messages scheduled:\n=================================================\n',
                );
                /* eslint-enable no-underscore-dangle */
            sendMessage(message.channel, `${list}`);
        });
}

module.exports = {
    args: 0,
    name: 'list-reminders',
    botAdmin: false,
    description: 'List all the scheduled reminders',
    usage: '',
    aliases: [],
    execute: listReminders,
    docs: `#### List scheduled reminders
- Command: \`list-reminders\`
- Returns: A listing of all the scheduled reminders to be sent, and the times they will be sent
- Example usage:
\`\`\`
User
> !list-reminders

Botomir
> I currently have the following reminders messages scheduled:
=================================================

jobID: 60adab0d980931395d457341
Tomorrow at 6:00 AM
Channel: #testing
Text: \`test message to be sent at 10pm\`
--------

jobID: 60adab38e004013972571888
Today at 4:30 PM
Channel: #testing
Text: \`also test message to be sent at 10pm\`
--------

\`\`\``,
};
