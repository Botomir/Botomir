// botScanner.js
// =============

const {goodBotRegex, goodBotMessage} = require("./goodBot");
const {badBotRegex, badBotMessage} = require("./badBot");

module.exports = {
    scannerHandler: function (message) {
        if (goodBotRegex.test(message)) {
            goodBotMessage(message);
        } else if (badBotRegex.test(message)) {
            badBotMessage(message);
        }
    }
};
