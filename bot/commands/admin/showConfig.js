const Discord = require('discord.js');
const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

function setRoleChannelCommand(message, args, config) {
    const disabled = config.disabledCommands.length !== 0 ? config.disabledCommands : 'No commands are disabled';
    const unassignableRoles = config.unassignableRoles.length !== 0 ? config.unassignableRoles : 'All roles are assignable';

    const welcome = config.welcomeChannel !== '' ? `<#${config.welcomeChannel}>` : 'unset';
    const music = config.musicChannelID !== '' ? `<#${config.musicChannelID}>` : 'unset';

    const configsEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Current server configuration')
        .setDescription('All of the current configurable admin settings')
        .addField('commandPrefix', config.commandPrefix, true)
        .addField('botAdminRole', config.botAdminRole, true)
        .addField('\u200b', '\u200b', true)
        .addField('welcomeChannel', welcome, true)
        .addField('musicChannelID', music, true)
        .addField('\u200b', '\u200b', true)
        .addField('playlistName', config.playlistName)
        .addField('playlistDescription', config.playlistDescription)
        .addField('tempUnit', config.tempUnit, true)
        .addField('weatherLocation', config.weatherLocation, true)
        .addField('timezone', config.timezone, true)
        .addField('\u200b', '\u200b')
        .addField('memeSubs', config.memeSubs, true)
        .addField('cuteSubs', config.cuteSubs, true)
        .addField('\u200b', '\u200b')
        .addField('disabledCommands', disabled, true)
        .addField('unassignableRoles', unassignableRoles, true)
        .setTimestamp()
        .setFooter(`For any questions contact ${process.env.BOT_MODS || '@Colonel Pineapple#3164'}`);

    sendMessage(message.channel, configsEmbed);
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
