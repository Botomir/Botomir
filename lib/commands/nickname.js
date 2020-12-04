// nickname.js
// ===========

const {splitStringBySpace} = require("./utilityFunctions");

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
    message.member.setNickname(nickname)
        .then(r => "Nickname successfully set | " + r)
        .catch(e => "Error: encountered error when setting nickname | " + e)
}

function unspecifiedNicknameError(message) {
    message.channel.send("Error: no nickname specified")
        .then(r => "Successfully sent unspecified nickname error message | " + r)
        .catch(e => "Error: encountered error when sending unspecified nickname error message | " + e);
}
