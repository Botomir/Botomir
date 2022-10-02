const source = require('rfr');

const Bot = source('bot');
const Handlebars = require('handlebars');

const { Webhook } = source('models/webhook');
const { createHmac, timingSafeEqual } = require('crypto');

const logger = source('bot/utils/logger');
const { sendMessage } = source('bot/utils/util');

// this will handle the actual hook processing
function handleHook(event, payload, hook) {
    const guild = Bot.client.guilds.cache.get(hook.guildID);
    const channel = guild.channels.cache.get(hook.channelID);

    const template = Handlebars.compile(hook.message);

    payload.event = event;
    const message = template(payload);

    return sendMessage(channel, message);
}

const WebhookController = {
    get(req, res) {
        return Webhook.getServerHooks(req.guild.id)
            .then((hooks) => Promise.all(hooks.map((h) => req.guild.members.fetch(h.createdBy)
                .then((member) => {
                    const channel = req.guild.channels.cache.get(h.channelID);
                    return {
                        id: h.hookID,
                        provider: h.provider,
                        method: h.method,
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
        const channels = req.guild.channels.cache.filter((c) => c.type === 'GUILD_TEXT').map((c) => ({
            name: c.name,
            id: c.id,
        }));

        res.render('webhookForm', {
            channels,
            serverID: req.guild.id,
        });
    },

    post(req, res) {
        const { channelID, provider, messageText, method } = req.body;

        const channels = req.guild.channels.cache
            .filter((c) => c.type === 'GUILD_TEXT')
            .map((c) => ({
                name: c.name,
                id: c.id,
            }));

        // make sure everything is set
        if (!channelID || !provider || !messageText) {
            return res.render('webhookForm', {
                errorMessage: 'Error, all of the fields are required',
                channels,
                channelID,
                provider,
                messageText,
                method,
                serverID: req.guild.id,
            });
        }

        // check to see if the template can actually be compiled so it does not crash later
        try {
            const template = Handlebars.compile(messageText);
            template();
        } catch (e) {
            return res.render('webhookForm', {
                errorMessage: 'Error, message template is not valid',
                channels,
                channelID,
                provider,
                messageText,
                method,
                serverID: req.guild.id,
            });
        }

        return new Webhook()
            .setGuild(req.guild.id)
            .setChannel(channelID)
            .setMessage(messageText)
            .setMethod(method)
            .setCreatedBy(req.user.id)
            .setProvider(provider)
            .save()
            .then((hook) => res.render('webhookConfirm', {
                secret: hook.secret,
                method: hook.method,
                url: `${process.env.BASE_URL}/hooks/${provider}/${hook.hookID}`,
                serverID: req.guild.id,
            }));
    },
};

const HookHandlerController = {

    github(req, res) {
        const sig = req.get('X-Hub-Signature-256') || '';
        const eventName = req.get('X-GitHub-Event') || '';
        const signature = Buffer.from(sig.replace('sha256=', ''), 'utf8');
        const jsonStr = JSON.stringify(req.body);

        return Webhook.getHook(req.params.hookID)
            .then((hook) => {
                if (!hook) {
                    return res.status(404).json({
                        error: `hook not found with ID ${req.params.hookID}`,
                    });
                }

                const hmac2 = createHmac('sha256', hook.secret);
                hmac2.update(jsonStr);
                const digest = Buffer.from(hmac2.digest('hex'));

                if (signature.length !== digest.length || !timingSafeEqual(signature, digest)) {
                    return res.status(403).json({
                        error: 'Hash is not correct, are you sure the correct secret was used',
                    });
                }

                handleHook(eventName, req.body, hook);
                return res.status(202).json({
                    message: 'successfully got the request, now processing',
                });
            })
            .catch((e) => {
                logger.error(`failed to handle the webhook: ${e.message}`);
                logger.error(e);

                res.status(500).json({
                    error: `Unknown error handing webhook: ${e.message}`,
                });
            });
    },

    gitlab(req, res) {
        const signature = req.get('X-Gitlab-Token') || '';
        const eventName = req.get('X-Gitlab-Event') || '';
        const signatureBuff = Buffer.from(signature, 'utf8');

        return Webhook.getHook(req.params.hookID)
            .then((hook) => {
                if (!hook) {
                    return res.status(404).json({
                        error: `hook not found with ID ${req.params.hookID}`,
                    });
                }

                // check that the secrets match
                const secretBuff = Buffer.from(hook.secret, 'utf8');
                if (signatureBuff.length !== secretBuff.length
                    || !timingSafeEqual(signatureBuff, secretBuff)) {
                    return res.status(403).json({
                        error: 'Hash is not correct, are you sure the correct secret was used',
                    });
                }

                handleHook(eventName, req.body, hook);
                return res.status(202).json({
                    message: 'successfully got the request, now processing',
                });
            })
            .catch((e) => {
                logger.error(`failed to handle the webhook: ${e.message}`);
                logger.error(e);

                res.status(500).json({
                    error: `Unknown error handing webhook: ${e.message}`,
                });
            });
    },

    custom(req, res) {
        return Webhook.getHook(req.params.hookID, req.method)
            .then((hook) => {
                if (!hook) {
                    return res.status(404).json({
                        error: `${req.method} hook not found with ID ${req.params.hookID}`,
                    });
                }

                const content = req.method === 'GET' ? req.query : req.body;
                handleHook('custom', content, hook);

                return res.status(202).json({
                    message: 'successfully got the request, now processing',
                });
            })
            .catch((e) => {
                logger.error(`failed to handle the webhook: ${e.message}`);
                logger.error(e);

                res.status(500).json({
                    error: `Unknown error handing webhook: ${e.message}`,
                });
            });
    },
};

module.exports = {
    WebhookController,
    WebhookNewController,
    HookHandlerController,
};
