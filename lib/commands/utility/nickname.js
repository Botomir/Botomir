// giveRole.js
// ===========

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');
const logger = source('lib/utils/logger');

function setNickname(user, nickname) {
    user.setNickname(nickname)
        .then((r) => logger.info('Nickname successfully set:', r))
        .catch((e) => logger.errr('Error: encountered error when setting nickname:', e));
}

function nicknameCommand(message, args) {
    const nickname = args.join(' ');

    if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
        sendMessage(message.channel, 'Error: bot does not have permission to manage nicknames');
    } else if (!message.member.manageable) {
        sendMessage(message.channel, 'Error: bot cannot manage user');
    } else {
        setNickname(message.member, nickname);
    }
}

module.exports = {
    args: 1,
    name: 'nickname',
    botAdmin: false,
    description: 'set your nickname',
    usage: 'nickname',
    aliases: [],
    execute: nicknameCommand,
};
