// nickname.js
// ===========

const {splitStringBySpace} = require("./commandUtilities");

module.exports = {
    nicknameCommand: function (message) {
        let nickname = splitStringBySpace(message)[1];

        if (!nickname) {
            unspecifiedNicknameError(message);
        } else if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
            sendManageNicknamePermissionError(message);
        } else if (!message.member.manageable) {
            sendManageUserError(message);
        } else {
            addUser(message, nickname);
        }
    }
};

function addUser(message, nickname) {
    message.member.setNickname(nickname)
        .then(r => "Nickname successfully set: " + r)
        .catch(e => "Error: encountered error when setting nickname: " + e);
}

function unspecifiedNicknameError(message) {
    message.channel.send("Error: no nickname specified")
        .then(r => "Successfully sent unspecified nickname error message: " + r)
        .catch(e => "Error: encountered error when sending unspecified nickname error message: " + e);
}

function sendManageNicknamePermissionError(message) {
    message.channel.send("Error: bot does not have permission to manage nicknames")
        .then(r => console.log("Successfully sent manage nicknames permission error: " + r))
        .catch(e => console.log("Error: encountered error when sending manage nicknames permission error: " + e))
}

function sendManageUserError(message) {
    message.channel.send("Error: bot cannot manage user")
        .then(r => console.log("Successfully sent manage user permission error: " + r))
        .catch(e => console.log("Error: encountered error when sending manage user permission error: " + e))
}