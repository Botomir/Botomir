const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Responses } = source('lib/database/models/responses');
const logger = source('lib/utils/logger');

function addBadBotCommand(message, args) {
    const response = new Responses()
        .setGuild(message.guild.id)
        .setMessage(args.join(' '))
        .setBotMode('badbot');

    return response.save()
        .then(() => {
            logger.info('saved bot response');
            sendMessage(message.channel, 'New bad bot response added');
        })
        .catch((err) => {
            logger.error(err);
            sendMessage(message.channel, 'Error adding bad bot response');
        });
}

module.exports = {
    args: 1,
    name: 'add-badbot',
    botAdmin: true,
    description: 'Add a response to send when someone says `bad bot`',
    usage: '<message>',
    aliases: [],
    execute: addBadBotCommand,
};
