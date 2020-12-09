// botScanner.js
// =============

const {goodBotRegex, goodBotMessage} = require("./goodBot");
const {badBotRegex, badBotMessage} = require("./badBot");

function scannerHandler(message) {
    if (goodBotRegex.test(message)) {
        goodBotMessage(message);
    } else if (badBotRegex.test(message)) {
        badBotMessage(message);
    }
}

module.exports = {
    scannerHandler: scannerHandler
};