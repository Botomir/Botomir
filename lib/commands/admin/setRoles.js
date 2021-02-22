const source = require('rfr');
const emojiRegex = require('emoji-regex/RGI_Emoji.js');

const { sendMessage } = source('lib/utils/util');
const { Settings } = source('lib/database/models/settings');
const { Role } = source('lib/database/models/role');

const { parseRoleMessage } = source('lib/utils/roleParsing');
const logger = source('lib/utils/logger');

function postRoleReactions(guild, header, mappings) {
    let settings;
    let watchMessage;
    return Settings.getServerSettings(guild.id)
        .then((config) => {
            settings = config;
            const welcomeChannel = guild.channels.cache.get(config.welcomeChannel);

            if (welcomeChannel === undefined) {
                throw new Error(`need to set the channel to post the role message too, use the \`${config.commandPrefix}set-role-channel\` command`);
            }

            const content = mappings.reduce((acc, m) => `${acc}${m.reactionEmoji} : \`${m.mapping.label}\`\n`, `${header}\n\n`);
            return sendMessage(welcomeChannel, content);
        })
        .then((message) => {
            watchMessage = message;
            return settings.setRoleMessage(message.id).save();
        })
        .then(() => watchMessage);
}

function reactToMessage(message, mappings) {
    return Promise.all(mappings.map((m) => message.react(m.reactionEmoji)));
}

function setRoleMessageCommand(message, args) {
    const parts = parseRoleMessage(args.join(' '));

    // lookup the actual emoji to use react with
    const mappings = parts.mappings.map((m) => {
        let reactionEmoji = m.emoji;

        if (!emojiRegex().test(m.emoji)) {
            reactionEmoji = message.guild.emojis.cache.find((emoji) => emoji.name === m.emoji);
        }

        return {
            reactionEmoji, mapping: m,
        };
    });

    return postRoleReactions(message.guild, parts.header, mappings)
        .then((m) => reactToMessage(m, mappings))
        .then(() => Role.removeServerRoles(message.guild.id))
        .then(() => {
            const promises = mappings.map((m) => new Role()
                .setEmoji(m.mapping.emoji)
                .setRole(m.mapping.roleName)
                .setGuild(message.guild.id)
                .save());
            return Promise.all(promises);
        })
        .then(() => {
            sendMessage(message.channel, 'Role reactions updated');
        })
        .catch((e) => {
            sendMessage(message.channel, `Failed to update the reaction roles: ${e.message}`);
            logger.error('something went wrong saving the roles:', e);
        });
}

module.exports = {
    args: 1,
    name: 'set-roles',
    botAdmin: true,
    description: 'autogenerate role mappings',
    usage: 'text to parse into the reaction roles',
    aliases: [],
    execute: setRoleMessageCommand,
};
