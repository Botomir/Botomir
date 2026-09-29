const { PermissionFlagsBits } = require('discord.js');
const source = require('rfr');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

function setNickname(user, nickname) {
    user.setNickname(nickname)
        .then((r) => logger.info('Nickname successfully set:', r))
        .catch((e) => logger.error('Error: encountered error when setting nickname:', e));
}

function nicknameCommand(message, args) {
    const nickname = args.join(' ');

    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageNicknames)) {
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
