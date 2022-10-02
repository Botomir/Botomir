const { MessageEmbed } = require('discord.js');
const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function setRoleChannelCommand(message, args, config) {
    const disabled = config.disabledCommands.length !== 0 ? config.disabledCommands : 'No commands are disabled';
    const unassignableRoles = config.unassignableRoles.length !== 0 ? config.unassignableRoles.join('\n') : 'All roles are assignable';

    const music = config.musicChannelID !== '' ? `<#${config.musicChannelID}>` : 'unset';

    const configsEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Current server configuration')
        .setDescription('All of the current configurable admin settings')
        .addFields([
            {
                name: 'commandPrefix', value: config.commandPrefix, inline: true,
            },
            {
                name: 'botAdminRole', value: config.botAdminRole, inline: true,
            },
            {
                name: '\u200b', value: '\u200b', inline: true,
            },
            {
                name: 'musicChannelID', value: music, inline: true,
            },
            {
                name: '\u200b', value: '\u200b', inline: true,
            },
            {
                name: 'playlistName', value: config.playlistName,
            },
            {
                name: 'playlistDescription', value: config.playlistDescription,
            },
            {
                name: 'tempUnit', value: config.tempUnit, inline: true,
            },
            {
                name: 'weatherLocation', value: config.weatherLocation, inline: true,
            },
            {
                name: 'timezone', value: config.timezone, inline: true,
            },
            {
                name: '\u200b', value: '\u200b',
            },
            {
                name: 'memeSubs', value: config.memeSubs.join('\n'), inline: true,
            },
            {
                name: 'cuteSubs', value: config.cuteSubs.join('\n'), inline: true,
            },
            {
                name: '\u200b', value: '\u200b',
            },
            {
                name: 'disabledCommands', value: disabled, inline: true,
            },
            {
                name: 'unassignableRoles', value: unassignableRoles, inline: true,
            },
        ])
        .setTimestamp()
        .setFooter({
            text: `For any questions contact ${process.env.BOT_MODS || '@Colonel Pineapple#3164'}`,
        });

    sendMessage(message.channel, {
        embeds: [configsEmbed],
    });
}

module.exports = {
    args: 0,
    name: 'show-settings',
    botAdmin: true,
    description: 'Show all of the current settings for botomir for this server',
    usage: '',
    aliases: ['show-settings', 'settings'],
    execute: setRoleChannelCommand,
    docs: `#### Show current server configuration
- Command: \`show-settings\`
- Args: None
- Returns: a message that says how botomir is configured
- Example usage
\`\`\`
User
> !show-settings
Botomir
>
embed
\`\`\``,
};
