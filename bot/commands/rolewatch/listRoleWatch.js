const source = require('rfr');

const { sendMessage } = source('bot/utils/util');
const { Role } = source('models/role');
const logger = source('bot/utils/logger');

function listRoleWatchMessages(message) {
    Role.findWatchMessages(message.guild.id)
        .then((list) => {
            const mes = list.reduce((acc, m, i) => `${acc}\n${i + 1}: https://discord.com/channels/${m.guild}/${m.channel}/${m.message}`, 'I am watching these messages for role reactions:');
            return sendMessage(message.channel, mes);
        })
        .catch((e) => {
            logger.error('something went wrong saving the roles:', e);
            sendMessage(message.channel, `Failed to update the reaction roles: ${e.message}`);
        });
}

module.exports = {
    args: 0,
    name: 'list-role-reaction',
    botAdmin: false,
    description: 'list all the messages that are being watched for reactions in this server',
    usage: '',
    aliases: [],
    execute: listRoleWatchMessages,
    docs: `#### List role reaction messages
- Command: \`!list-role-reaction\`
- Returns: list of all the role reaction message botomir is watching
- Example usage:
\`\`\`
User
!list-role-reaction

Botomir
> I am currently watching the following messages for reactions:
https://discord.com/channels/788091112476770353/840781330538168350/848597559614111764
https://discord.com/channels/788091112476770353/840781330538168350/848597559614111764
https://discord.com/channels/788091112476770353/840781330538168350/848597559614111764
\`\`\``,
};
