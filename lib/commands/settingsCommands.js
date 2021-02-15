const source = require('rfr');
const emojiRegex = require('emoji-regex/RGI_Emoji.js');


const { loadSettings, updateServerSettings, saveRoleMapping, clearRoleMappings, addBotResponse } = source('lib/database/mongoDB');
const { sendMessage } = source('lib/utils/util');
const { splitStringBySpace, discardCommand } = source('lib/commands/commandUtilities');
const logger = source('lib/utils/logger');

function parseEmoji(text) {
    const discordRegex = /^<:([^:]+):[0-9]+>$/;

    const parse = discordRegex.exec(text);
    if (parse !== null && parse.length === 2) return parse[1].trim();

    const unicdode = emojiRegex().exec(text);
    if (unicdode !== null) return unicdode[0];

    return null;
}

function removeRoleHeader(text) {
    const parts = text.split('\n\n');

    if (parts.length > 1) {
        return parts.slice(1).join('\n\n').trim();
    }
    return '';
}

// return a list of (emoji, role name) pairs
function parseRoleMessage(text) {
    const roleText = removeRoleHeader(text);
    if (roleText === '') return [];

    const roleLines = roleText.split('\n').map((l) => l.trim()).filter((l) => l.length !== 0);
    const roleRegex = /(.*):([^:]*)/;

    return roleLines.map((l) => {
        const parts = roleRegex.exec(l);
        if (parts === null || parts.length !== 3) return null;
        return {
            emoji: parseEmoji(parts[1].trim()), role: parts[2].trim(),
        };
    }).filter((r) => r !== null);
}

function updateSetting(message, changes) {
    return loadSettings(message.guild.id)
        .then((config) => {
            changes.forEach((change) => {
                config[change.name] = change.value; // eslint-disable-line no-param-reassign
            });

            return updateServerSettings(config.guild, config);
        })
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err}`));
}

function addMemeSubCommand(message) {
    // add a new meme subredit to the list of memes for the server

    const parts = splitStringBySpace(message.content);

    if (parts.length === 1) {
        return sendMessage(message.channel, 'Error: Did not specify a subreddit');
    }

    return loadSettings(message.guild.id)
        .then((config) => {
            config.meme_subreddits.push(parts[1]);
            return updateServerSettings(message.guild.id, config);
        })
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err}`));
}

function addCuteSubCommand(message) {
    // add a new cute subredit to the list of memes for the server

    const parts = splitStringBySpace(message.content);

    if (parts.length === 1) {
        return sendMessage(message.channel, 'Error: Did not specify a subreddit');
    }

    return loadSettings(message.guild.id)
        .then((config) => {
            config.cute_subreddits.push(parts[1]);
            return updateServerSettings(message.guild.id, config);
        })
        .then(() => sendMessage(message.channel, 'Settings updated.'))
        .catch((err) => sendMessage(message.channel, `Error Something went wrong: ${err}`));
}

function setRoleMessageCommand(message) {
    // sets the message that contains all the roll reactions:
    // the message must consist of a welcome scentence and then a set of `<emoji>: <roll name>\n`
    // the role name MUST match an existing role on the server

    const messageLinkRegex = /^https:\/\/discord.com\/channels\/([0-9]*)\/([0-9]*)\/([0-9]*)$/;
    const parts = messageLinkRegex.exec(discardCommand(message.content));

    if (parts === null || parts.length !== 4) {
        return sendMessage(message.channel, 'Error: must send a link to the message');
    }

    const serverID = message.guild.id;
    const channelID = parts[2];
    const messageID = parts[3];
    return clearRoleMappings(message.guild.id)
        .then(() => message.client.channels.cache.get(channelID).messages.fetch(messageID))
        .then((roleMessage) => {
            logger.log(`role message found: ${roleMessage}`);
            const roleMappings = parseRoleMessage(roleMessage.content);

            const promises = roleMappings.map((m) => saveRoleMapping(serverID, m.emoji, m.role));
            return Promise.all(promises);
        })
        .then(() => {
            updateSetting(message, [
                { name: 'role_watch_message', value: messageID, },
            ]);
        })
        .catch((e) => logger.log(`Error: something went wrong saving the roles: ${e}`));
}

function addGoodBotCommand(message) {
    addBotResponse(message.guild.id, discardCommand(message.content), 'goodbot')
        .then(() => {
            logger.log('saved bot response');
            sendMessage(message.channel, 'New good bot response added');
        })
        .catch((err) => {
            logger.log(`saved bot response: ${err}`);
            sendMessage(message.channel, 'Error adding good bot response');
        });
}

function addBadBotCommand(message) {
    addBotResponse(message.guild.id, discardCommand(message.content), 'badbot')
        .then(() => {
            logger.log('saved bot response');
            sendMessage(message.channel, 'New good bot response added');
        })
        .catch((err) => {
            logger.log(`saved bot response: ${err}`);
            sendMessage(message.channel, 'Error adding good bot response');
        });
}

function setPlaylistNameCommand(message) {
    const parts = splitStringBySpace(message.content);

    if (parts.length === 1) {
        return sendMessage(message.channel, 'Error: Did not specify a playlist name');
    }

    const name = parts.slice(1).join(' ');
    return updateSetting(message, [{
        name: 'playlist_name', value: name,
    }]);
}

function setPlaylistDescriptionCommand(message) {
    const parts = splitStringBySpace(message.content);

    if (parts.length === 1) {
        return sendMessage(message.channel, 'Error: Did not specify a playlist description');
    }

    const text = parts.slice(1).join(' ');
    return updateSetting(message, [{
        name: 'playlist_description', value: text,
    }]);
}

function setPrefixCommand(message) {
    const parts = splitStringBySpace(message.content);

    if (parts.length !== 2 && parts[1].length !== 1) {
        return sendMessage(message.channel, 'Error: command prefix can only be one character');
    }

    const commandPrefix = parts[1];
    return updateSetting(message, [{
        name: 'command_prefix', value: commandPrefix,
    }]);
}

module.exports = {
    addMemeSubCommand,
    addCuteSubCommand,
    setPlaylistNameCommand,
    setPlaylistDescriptionCommand,
    setPrefixCommand,
    setRoleMessageCommand,
    addGoodBotCommand,
    addBadBotCommand,
};
