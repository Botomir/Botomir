// botMessage.js
// =============

const {goodBotRegex, goodBotMessage} = require("./messages/goodBot");
const {badBotRegex, badBotMessage} = require("./messages/badBot");

module.exports = {
    messageScanner: function (message) {
        if (goodBotRegex.test(message)) {
            goodBotMessage(message);
        } else if (badBotRegex.test(message)) {
            badBotMessage(message);
        }
    }
};
