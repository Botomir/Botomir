const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function setPrefixCommand(message, args, config) {
    return config.setCommandPrefix(args[0]).save()
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, 'Error Something went wrong:', err));
}

module.exports = {
    args: 1,
    name: 'set-prefix',
    botAdmin: true,
    description: 'change the bot command prefix',
    usage: '<character>',
    aliases: [],
    execute: setPrefixCommand,
};
