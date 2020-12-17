const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

function pingCommand(message) {
    sendMessage(message.channel, 'Pong');
}

exports.pingCommand = pingCommand;
