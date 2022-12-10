const _ = require('lodash');
const source = require('rfr');

const { Events } = require('discord.js');

const { sendMessage } = source('bot/utils/util');
const logger = source('bot/utils/logger');

const { Responses } = source('models/responses');
const { Statistics, EventTypes } = source('models/statistics');

const badBotRegex = /[Bb][Aa][Dd]\s+[Bb][Oo][Tt]/;

const defaultMessage = ':\'[';

function botMessage(message) {
    if (message.guild === null || message.author.bot || !badBotRegex.test(message.content)) return;

    Responses.findForMode(message.guild.id, 'badbot')
        .then((res) => {
            const response = res.length !== 0 ? _.sample(res).message : defaultMessage;
            return sendMessage(message.channel, response);
        })

        .then(() => new Statistics()
            .setGuild(message.guild.id)
            .setEvent(EventTypes.BAD_BOT)
            .save())
        .then(() => logger.info('statistics saved'))
        .catch((err) => logger.error('Error getting message:', err));
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: botMessage,
};
