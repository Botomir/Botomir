const _ = require('lodash');
const source = require('rfr');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

const { Responses } = source('models/responses');
const { Statistics, EventTypes } = source('models/statistics');

const goodBotRegex = /[Gg][Oo][Oo][Dd]\s+[Bb][Oo][Tt]/;
const badBotRegex = /[Bb][Aa][Dd]\s+[Bb][Oo][Tt]/;

function botMessage(message, botMode) {
    const defaultMessage = botMode === 'goodbot' ? ':]' : ':\'[';

    return Responses.findForMode(message.guild.id, botMode)
        .then((res) => {
            const response = res.length !== 0 ? _.sample(res).message : defaultMessage;
            return sendMessage(message.channel, response);
        })
        .then(() => {
            const eventName = botMode === 'goodbot' ? EventTypes.GOOD_BOT : EventTypes.BAD_BOT;
            return new Statistics().setGuild(message.guild.id).setEvent(eventName).save();
        })
        .then(() => logger.info('statistics saved'))
        .catch((err) => logger.error('Error getting message:', err));
}

module.exports = {
    goodBotRegex,
    badBotRegex,
    botMessage,
};
