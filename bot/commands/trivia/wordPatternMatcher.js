const source = require('rfr');
const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

const searchStream = (filename, text) => new Promise((resolve) => {
    const inStream = fs.createReadStream(filename);
    const outStream = new Stream();
    const rl = readline.createInterface(inStream, outStream);
    const result = [];
    const regEx = new RegExp(text, 'i');
    rl.on('line', (line) => {
        if (line && line.search(regEx) >= 0) {
            result.push(line);
        }
    });
    rl.on('close', () => {
        logger.info('finished search', filename);
        resolve(result);
    });
});

function command(message, args) {
    if (!fs.existsSync(process.env.DICTIONARY_FILE)) {
        return sendMessage(message.channel, 'Cannot use the command, no dictionary file is present.');
    }
    const pattern = `^${args[0].toLowerCase()}$`;

    return searchStream(process.env.DICTIONARY_FILE, pattern)
        .then((words) => {
            sendMessage(message.channel, `Possible words are:\n${words.join('\n')}`);
        })
        .catch((err) => logger.error('error searching the file for the pattern:', err));
}

module.exports = {
    args: 1,
    name: 'missing-letters',
    botAdmin: false,
    description: 'A trivia solver to fill in the missing letters of a word. ie. "pri...ul" is "prideful" ',
    usage: '<word pattern>',
    aliases: [],
    execute: command,
    docs: `#### Missing Letters
- Command: \`missing-letters\`
- Returns: A list of possible words that match the pattern
- Example usage:
\`\`\`
User
> !missing-letters pri...ul

Botomir
> Possible words are:
  prideful
\`\`\``,
};
