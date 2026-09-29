require('dotenv').config({
    quiet: true,
});
const express = require('express');
const exphbs = require('express-handlebars');
const source = require('rfr');
const helmet = require('helmet');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const refresh = require('passport-oauth2-refresh');
const cookieParser = require('cookie-parser');
const { MongoStore } = require('connect-mongo');

const logger = source('bot/utils/logger');
const router = source('routes');

const Bot = source('bot');
const agenda = source('scheduler');

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const scopes = ['identify', 'guilds'];
const prompt = 'consent';

const discordStrat = new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/discord/authorize`,
    scope: scopes,
    prompt,
}, (accessToken, refreshToken, profile, done) => {
    profile.refreshToken = refreshToken; // store this for later refreshes

    // store the user info here????

    const userGuildIDs = profile.guilds.map((g) => g.id);
    const guilds = Bot.client.guilds.cache.filter((guild) => userGuildIDs.includes(guild.id));
    profile.guilds = guilds;

    return done(null, profile);
});

passport.use(discordStrat);
refresh.use(discordStrat);

const app = express();

// express 5 defaults to the 'simple' query parser, keep the express 4 behaviour
app.set('query parser', 'extended');

// keep the helmet 6 defaults for COEP and HSTS max-age (180 days)
app.use(helmet({
    crossOriginEmbedderPolicy: true,
    strictTransportSecurity: {
        maxAge: 15552000,
    },
}));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
    }),
}));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: true,
})); // for parsing application/x-www-form-urlencoded

// express 5 leaves req.body undefined when no parser ran, keep the express 4 behaviour
app.use((req, res, next) => {
    if (req.body === undefined) {
        req.body = {
        };
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('discord', {
    scope: scopes, prompt,
}), () => {});

app.get(
    '/discord/authorize',
    passport.authenticate('discord', {
        failureRedirect: '/',
    }),
    (req, res) => {
        const redirectUri = req.cookies.redirect_uri || '/';
        res.clearCookie('redirect_uri');
        res.redirect(redirectUri);
    },
);

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.redirect('/');
    });
});

app.use(router);

const port = !process.env.PORT ? 8300 : process.env.PORT;
const server = app.listen(port, (err) => {
    if (err) throw err;
    logger.info(`Server started on port ${port}`);
});

Bot.client.login(process.env.DISCORD_TOKEN);

mongoose.connect(process.env.DATABASE_URL)
    .then((r) => logger.info(`Successfully connected to MongoDB: ${r}`))
    .catch((e) => logger.error(`Error starting up mongo: ${e}`));

agenda.start()
    .then(() => logger.info('agenda is now ready'))
    .catch((e) => logger.error('agenda failed to start', e));

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');

    server.close(() => {
        logger.info('Http server closed.');

        Bot.client.destroy();
        mongoose.connection.close(false).then(() => {
            logger.info('MongoDb connection closed.');
            process.exit(0);
        });
    });
});
