// nickname.js
// ===========
const source = require('rfr');

const {splitStringBySpace} = source('lib/commands/commandUtilities');
const {sendMessage} = source('lib/utils/util');

function nicknameCommand(message) {
    let nickname = splitStringBySpace(message.content)[1];

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

function addUser(message, nickname) {
    message.member.setNickname(nickname)
        .then(r => console.log('Nickname successfully set: ' + r))
        .catch(e => console.log('Error: encountered error when setting nickname: ' + e));
}

exports.nicknameCommand = nicknameCommand;
