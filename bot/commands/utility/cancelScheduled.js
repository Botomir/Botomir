const source = require('rfr');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');
const agenda = source('scheduler');

const { ObjectId } = require('mongoose').Types;

function cancelJob(message, args, config) {
    let id;
    try {
        id = ObjectId(args[0]);
    } catch (error) {
        return sendMessage(message.channel, `'${args[0]}' is not a valid id, try \`${config.commandPrefix}list-scheduled\` to get the correct ID`);
    }

    return agenda.jobs({
        'data.serverID': message.guild.id,
        _id: id,
    })
        .then((jobs) => {
            if (jobs.length !== 1) {
                return sendMessage(message.channel, 'No scheduled job was found, are you sure you had the right id?');
            }

            if (message.author.id === jobs[0].attrs.data.owner
                || message.member.roles.cache.find((r) => r.name === config.botAdminRole)) {
                return jobs[0].remove()
                    .then(() => sendMessage(message.channel, 'Canceled the scheduled message'));
            }
            return sendMessage(message.channel, 'You can not cancel that scheduled message because you did not set it');
        })
        .catch((e) => {
            logger.error(e);
            sendMessage(message.channel, `${e.name} ${e.message}`);
        });
}

module.exports = {
    args: 1,
    name: 'cancel-job',
    botAdmin: false,
    description: 'Cancels one of the scheduled jobs',
    usage: '<job ID>',
    aliases: [],
    execute: cancelJob,
    docs: `#### Cancel scheduled jobs
- Command: \`cancel-job\`
- Returns: Cancels any future runs of a job
- Example usage:
\`\`\`
User
> !cancel-job 60adab0d980931395d457341

Botomir
> Canceled the scheduled message

\`\`\``,
};
