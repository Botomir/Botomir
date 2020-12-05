// nickname.js
// ===========

const {splitStringBySpace} = require("./commandUtilities");

module.exports = {
  nicknameCommand: function(message) {
      let nickname = splitStringBySpace(message)[1];

      if (nickname) {
          setNickname(message, nickname);
      } else {
          unspecifiedNicknameError(message);
      }
  }
};

function setNickname(message, nickname) {
    if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
        if (message.member.manageable) {
            addUser(message, nickname);
        } else {
            manageUserError(message)
        }
    } else {
        manageNicknamesError(message);
    }
}

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

function manageNicknamesError(message) {
    message.channel.send("Error: bot does not have permission to manage nicknames")
        .then(r => console.log("Successfully sent manage nicknames permission error: " + r))
        .catch(e => console.log("Error: encountered error when sending manage nicknames permission error: " + e))
}

function manageUserError(message) {
    message.channel.send("Error: bot cannot manage user")
        .then(r => console.log("Successfully sent manage user permission error: " + r))
        .catch(e => console.log("Error: encountered error when sending manage user permission error: " + e))
}