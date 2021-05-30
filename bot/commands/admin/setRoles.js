const source = require('rfr');
const emojiRegex = require('emoji-regex/RGI_Emoji.js');

const { sendMessage, lookupRoleName } = source('bot/utils/util');
const { Role } = source('models/role');

const { parseRoleMessage } = source('bot/utils/roleParsing');
const logger = source('bot/utils/logger');

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
    const parts = parseRoleMessage(message.guild, args.join(' '));

    // lookup the actual emoji to use react with
    const mappings = parts.mappings
        .filter((m) => m.role && !config.unassignableRoles.includes(m.role.name))
        .map((m) => {
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
                .setRole(m.mapping.role.name)
                .setRoleID(m.mapping.role.id)
                .setGuild(watchMessage.guild.id)
                .setChannel(watchMessage.channel.id)
                .setMessage(watchMessage.id)
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
    docs: `#### Set role mappings for reaction assignment
- Command: \`!set-roles <message>\`
- Returns: Botomir will autogenerate a role assignment message to the specified role watch channel
- Specifications
  - The role assignment can start with a message and be followed by \`---\` to specify role reactions
  - You can specify role reactions using the following format: \`<emoji> :<name of role>\`
  - To set a custom name for the role you can use the following format: \`<emoji> : <name of role> : <custom name>\`
  - This command can only be called after the \`set-role-channel\` command is executed
  - Will filter out any roles that have been marked as unassignable on the server
- Example usage:
\`\`\`
User
!set-roles This is a really cool message about automated role assignment

---
: fire: : role A : a super cool role
: waffle: : role B
\`\`\`

And will auto-generate the following message:
\`\`\`
This is a really cool message about automated role assignment
:fire: a super cool role
:waffle: role B
\`\`\``,
};
