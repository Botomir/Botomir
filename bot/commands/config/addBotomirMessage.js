const source = require('rfr');

const { sendMessage } = source('bot/utils/util');
const { Responses } = source('models/responses');
const logger = source('bot/utils/logger');

function addBadBotCommand(message, args) {
    const response = new Responses()
        .setGuild(message.guild.id)
        .setMessage(args.join(' '))
        .setBotMode('botomir');

    return response.save()
        .then(() => {
            logger.info('saved Botomir mention response');
            sendMessage(message.channel, 'New Botomir mention response added');
        })
        .catch((err) => {
            logger.error(err);
            sendMessage(message.channel, 'Error adding Botomir mention response');
        });
}

module.exports = {
    args: 1,
    name: 'add-botomir',
    botAdmin: true,
    description: 'Add a response to send when someone says `Botomir`',
    usage: '<message>',
    aliases: [],
    execute: addBadBotCommand,
    docs: `#### Add Botomir mention response
- Command: \`!add-botomir <custom response>\`
- Returns: new response to user sending \`Botomir mention\` and success or failure message is sent
- Example usage:
\`\`\`
User:
> !add-botomir I am a cool bot
            
    botomir
> New Botomir mention response added
\`\`\``,
};
