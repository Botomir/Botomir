// nickname.js
// ===========
const source = require('rfr');

const { splitStringBySpace } = source('lib/commands/commandUtilities');
const { sendMessage } = source('lib/utils/util');
const logger = source('lib/utils/logger');

function addUser(message, nickname) {
    message.member.setNickname(nickname)
        .then((r) => logger.info(`Nickname successfully set: ${r}`))
        .catch((e) => logger.error(`encountered error when setting nickname: ${e}`));
}

function nicknameCommand(message) {
    const nickname = splitStringBySpace(message.content)[1];

    if (!nickname) {
        sendMessage(message.channel, 'Error: no nickname specified');
    } else if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
        sendMessage(message.channel, 'Error: bot does not have permission to manage nicknames');
    } else if (!message.member.manageable) {
        sendMessage(message.channel, 'Error: bot cannot manage user');
    } else {
        addUser(message, nickname);
    }
}

exports.nicknameCommand = nicknameCommand;
