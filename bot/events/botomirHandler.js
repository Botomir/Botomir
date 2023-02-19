const _ = require('lodash');
const source = require('rfr');
const { Events } = require('discord.js');

const { sendReply } = source('bot/utils/util');
const logger = source('bot/utils/logger');

const { Responses } = source('models/responses');
const { Statistics, EventTypes } = source('models/statistics');

const botomirRegex = /botomir/;

const defaultMessage = "Hi, I'm Botomir! Are you talking about me, the worlds greatest Discord bot????";

function botMessage(message) {
    if (message.guild === null
        || message.author.bot
        || !botomirRegex.test(message.content.toLowerCase())) {
        return;
    }

    Responses.findForMode(message.guild.id, 'botomir')
        .then((res) => {
            const response = res.length !== 0 ? _.sample(res).message : defaultMessage;
            return sendReply(message, response);
        })

        .then(() => new Statistics()
            .setGuild(message.guild.id)
            .setEvent(EventTypes.BOTOMIR_MENTION)
            .save())
        .then(() => logger.info('statistics saved'))
        .catch((err) => logger.error('Error getting message:', err));
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: botMessage,
};
