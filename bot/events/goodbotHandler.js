const _ = require('lodash');
const source = require('rfr');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

const { Responses } = source('models/responses');
const { Statistics, EventTypes } = source('models/statistics');

const goodBotRegex = /[Gg][Oo][Oo][Dd]\s+[Bb][Oo][Tt]/;

function botMessage(message) {
    if (message.guild === null || message.author.bot) return;
    if (!goodBotRegex.test(message.content)) return;

    return Responses.findForMode(message.guild.id, 'goodbot')
        .then((res) => {
            const response = res.length !== 0 ? _.sample(res).message : ':]';
            return sendMessage(message.channel, response);
        })
        .then(() => new Statistics().setGuild(message.guild.id).setEvent(EventTypes.GOOD_BOT).save())
        .then(() => logger.info('statistics saved'))
        .catch((err) => logger.error('Error getting message:', err));
}

module.exports = {
    name: 'message',
    once: false,
    execute: botMessage,
};
