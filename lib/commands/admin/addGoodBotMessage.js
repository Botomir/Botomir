// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const { Responses } = source('lib/database/models/responses');
const logger = source('lib/utils/logger');

function addGoodBotCommand(message, args) {
    const response = new Responses()
        .setGuild(message.guild.id)
        .setMessage(args.join(' '))
        .setBotMode('goodbot');

    return response.save()
        .then(() => {
            logger.log('saved bot response');
            sendMessage(message.channel, 'New good bot response added');
        })
        .catch((err) => {
            logger.log(`saved bot response: ${err}`);
            sendMessage(message.channel, 'Error adding good bot response');
        });
}

module.exports = {
    args: 1,
    name: 'add-goodbot',
    botAdmin: true,
    description: 'Add a response to send when someone says `good bot`',
    usage: '<message>',
    aliases: [],
    execute: addGoodBotCommand,
};
