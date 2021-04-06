const source = require('rfr');

const { sendMessage } = source('bot/utils/util');
const { Statistics, EventTypes } = source('models/statistics');

const logger = source('bot/utils/logger');

function purgeCommand(message, args) {
    if (args.length !== 1) {
        return sendMessage(message.channel, 'Error you can only give one number for the number of messages to delete');
    }

    const numMessages = Number.parseInt(args[0], 10);
    if (Number.isNaN(numMessages)) {
        return sendMessage(message.channel, 'The number of messages to delete must be a number');
    }

    return message.channel.bulkDelete(numMessages)
        .then((messages) => {
            logger.warn(`deleted ${messages.size} from channel ${message.channel.name} in ${message.guild.name} by ${message.author.name}`);
            // TODO add an audir log here once auditing is added
            sendMessage(message.channel, `:skull_crossbones: Poof ${messages.size} messages were successfully deleted`);
            return new Statistics()
                .setGuild(message.guild.id)
                .setEvent(EventTypes.MESSAGES_DELETED)
                .setDetails(messages.size)
                .save()
                .then(() => logger.info('statistics saved'))
                .catch((e) => logger.error('failed to save statistics', e));
        })
        .catch((e) => {
            logger.error('failed to delete messages', e);
            sendMessage(message.channel, `Messages failed to delete - ${e.message}`);
        });
}

module.exports = {
    args: 1,
    name: 'purge',
    botAdmin: true,
    description: 'deleted X messages from the channels history from the channel that this is called from. **DANGEROUS**',
    usage: '<number of messages>',
    aliases: ['delete'],
    execute: purgeCommand,
    docs: `#### Purge Messages from Channel
- Command: \`purge\`
- Returns: removed the specified number of messages from the channel this is called in.
- Example usage:
\`\`\`
User
> !purge 5

Botomir
> Poof there go the messages.
\`\`\``,
};
