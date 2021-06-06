const source = require('rfr');
// const moment = require('moment');
const cronstrue = require('cronstrue');
// const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

function listScheduled(message) {
    agenda.jobs({
        'data.serverID': message.guild.id,
    })
        .then((jobs) => {
            const list = jobs.filter((j) => j.attrs.repeatInterval)
                .reduce((acc, j) => {
                    const intervalString = cronstrue.toString(j.attrs.repeatInterval, {
                        verbose: true,
                    });
                    // eslint-disable-next-line no-underscore-dangle
                    return `${acc}\njobID: ${j.attrs._id}\nSchedule: ${intervalString}\nChannel: <#${j.attrs.data.channelID}>\nText: \`${j.attrs.data.message}\`\n--------\n`;
                }, 'I currently have the following recurring messages scheduled:\n=================================================\n');
            sendMessage(message.channel, `${list}`);
        });
}

module.exports = {
    args: 0,
    name: 'list-jobs',
    botAdmin: false,
    description: 'List all the scheduled jobs',
    usage: '',
    aliases: [],
    execute: listScheduled,
    docs: `#### List scheduled jobs
- Command: \`list-jobs\`
- Returns: A listing of all the scheduled messages to be sent, and their intervals
- Example usage:
\`\`\`
User
> !list-jobs

Botomir
> I currently have the following recurring messages scheduled:
=================================================

jobID: 60adab0d980931395d457341
Schedule: At 10:00 PM, every day
Channel: #testing
Text: \`test message to be sent at 10pm\`
--------

jobID: 60adab38e004013972571888
Schedule: At 10:00 PM, every day
Channel: #testing
Text: \`also test message to be sent at 10pm\`
--------

\`\`\``,
};
