const source = require('rfr');
const emojiRegex = require('emoji-regex/RGI_Emoji.js');

const { sendMessage } = source('lib/utils/util');
const { Role } = source('lib/database/models/role');

const { parseRoleMessage } = source('lib/utils/roleParsing');
const logger = source('lib/utils/logger');

function generateMessageContent(header, mappings) {
    return mappings.reduce((acc, m) => `${acc}${m.reactionEmoji} : \`${m.mapping.label}\`\n`, `${header}\n\n`);
}

function postRoleReactions(guild, header, mappings, config) {
    return new Promise(((resolve, reject) => {
        const welcomeChannel = guild.channels.cache.get(config.welcomeChannel);

        if (welcomeChannel !== undefined) return resolve(welcomeChannel);

        return reject(new Error(`need to set the channel to post the role message too, use the \`${config.commandPrefix}set-role-channel\` command`));
    }))
        .then((c) => sendMessage(c, generateMessageContent(header, mappings)));
}

function reactToMessage(message, mappings) {
    return Promise.all(mappings.map((m) => message.react(m.reactionEmoji)));
}

function setRoleMessageCommand(message, args, config) {
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

    let watchMessage;
    let prom;

    if (!config.roleMessage || !config.welcomeChannel) {
        prom = postRoleReactions(message.guild, parts.header, mappings, config);
    } else {
        prom = new Promise(((resolve, reject) => {
            const channel = message.guild.channels.cache.get(config.welcomeChannel);
            if (!channel) return reject(new Error('role watch channel does not exist'));

            return resolve(
                channel.messages.fetch(config.roleMessage)
                    .catch(() => {
                        sendMessage(message.channel, 'The message seems to be gone, creating a new one');
                        return postRoleReactions(message.guild, parts.header, mappings, config);
                    })
                    .then((mess) => {
                    // if it was created less than a second ago it was probably just made
                        if (new Date().valueOf() - mess.createdAt < 1000) return mess;

                        if (!mess.editable) {
                            sendMessage(message.channel, 'Can not edit message, creating a new one');
                            return postRoleReactions(message.guild, parts.header, mappings, config);
                        }
                        return mess.edit(generateMessageContent(parts.header, mappings));
                    }),
            );
        }));
    }

    return prom.then((m) => {
        watchMessage = m;
        return config.setRoleMessage(m.id).save();
    })
        .then(() => Role.removeServerRoles(message.guild.id))
        .then(() => {
            const promises = mappings.map((m) => new Role()
                .setEmoji(m.mapping.emoji)
                .setRole(m.mapping.roleName)
                .setGuild(message.guild.id)
                .save());
            return Promise.all(promises);
        })
        .then(() => sendMessage(message.channel, 'Role reactions updated'))
        .then(() => reactToMessage(watchMessage, mappings))
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
