const source = require('rfr');

// const Bot = source('bot');

const { Webhook } = source('models/webhook');

const WebhookController = {
    get(req, res) {
        return Webhook.getServerHooks(req.guild.id)
            .then((hooks) => Promise.all(hooks.map((h) => req.guild.members.fetch(h.createdBy)
                .then((member) => {
                    const channel = req.guild.channels.cache.get(h.channelID);
                    return {
                        id: h.hookID,
                        provider: h.provider,
                        channelName: channel.name,
                        channelID: channel.id,
                        createdBy: member.user.username,
                    };
                }))))
            .then((hooks) => {
                res.render('webhookSettings', {
                    hook: hooks,
                    serverID: req.guild.id,
                });
            });
    },
};

const WebhookNewController = {
    get(req, res) {
        const channels = req.guild.channels.cache.filter((c) => c.type === 'text').map((c) => ({
            name: c.name,
            id: c.id,
        }));

        res.render('webhookForm', {
            channels,
            serverID: req.guild.id,
        });
    },

    post(req, res) {
        const { channelID, provider, messageText } = req.body;

        // make sure everything is set
        if (!channelID || !provider || !messageText) {
            const channels = req.guild.channels.cache.filter((c) => c.type === 'text').map((c) => ({
                name: c.name,
                id: c.id,
            }));

            return res.render('webhookServerSelection', {
                errorMessage: 'Error, all of the fields are required',
                channels,
                channelID,
                provider,
                messageText,
                serverID: req.guild.id,
            });
        }

        return new Webhook()
            .setGuild(req.guild.id)
            .setChannel(channelID)
            .setMessage(messageText)
            .setCreatedBy(req.user.id)
            .setProvider(provider)
            .save()
            .then((hook) => res.render('webhookConfirm', {
                secret: hook.secret,
                url: `${process.env.BASE_URL}/hooks/${hook.hookID}`,
                serverID: req.guild.id,
            }));
    },
};

module.exports = {
    WebhookController,
    WebhookNewController,
};
