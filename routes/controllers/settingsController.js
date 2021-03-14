const source = require('rfr');

const Bot = source('bot');

const { Settings } = source('models/settings');

const SettingsController = {
    get(req, res) {
        res.render('settings', {
            servers: req.user.guilds,
        });
    },
};

const ConfigController = {
    get(req, res) {
        if (!req.query.serverID || !req.user.guilds.find((g) => g.id === req.query.serverID)) {
            return res.redirect('/settings');
        }

        const guild = Bot.client.guilds.cache.get(req.query.serverID);

        return Settings.getServerSettings(guild.id)
            .then((config) => res.render('configure', {
                guildName: guild.name,
                channels: guild.channels.cache.filter((c) => c.type === 'text').map((c) => ({
                    name: c.name,
                    id: c.id,
                    isMusic: config.musicChannelID === c.id,
                    isRoleWatch: config.welcomeChannel === c.id,
                })),
                roles: guild.roles.cache.filter((r) => r.name !== '@everyone').map((c) => ({
                    name: c.name,
                    id: c.id,
                    isAdmin: config.botAdminRole === c.id,
                    assignable: !config.unassignableRoles.includes(c.name),
                })),
                commands: Bot.client.commands.map((c) => ({
                    name: c.name,
                    enabled: !config.disabledCommands.includes(c.name),
                })),
                config: config.toAPI(),
            }));
    },
};

module.exports = {
    SettingsController,
    ConfigController,
};
