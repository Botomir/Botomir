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
    get(req, res, next) {
        if (!req.query.serverID || !req.user.guilds.find((g) => g.id === req.query.serverID)) {
            return res.redirect('/settings');
        }

        const guild = Bot.client.guilds.cache.get(req.query.serverID);
        if (!guild) {
            return next({
                status: 500,
                message: 'Failed to get lookup the discord server, the app is probably not ready yet',
            });
        }

        let user;
        return guild.members.fetch({
            user: req.user.id, force: true,
        })
            .then((member) => {
                user = member;
                return Settings.getServerSettings(guild.id);
            })
            .then((config) => {
                const canManage = user.roles.cache.find((r) => r.name === config.botAdminRole);

                if (!canManage) {
                    return next({
                        status: 403, message: 'not authorized',
                    });
                }

                return res.render('configure', {
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
                        isAdmin: config.botAdminRole === c.name,
                        assignable: !config.unassignableRoles.includes(c.name),
                    })),
                    commands: Bot.client.commands.map((c) => ({
                        name: c.name,
                        enabled: !config.disabledCommands.includes(c.name),
                    })),
                    config: config.toAPI(),
                });
            });
    },
};

module.exports = {
    SettingsController,
    ConfigController,
};
