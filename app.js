// app.js
// ======

require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const source = require('rfr');
const helmet = require('helmet');
const mongoose = require('mongoose');

const Bot = source('lib/bot');
const { getSpotifyAuthToken } = source('lib/spotify/spotifyApi');
const logger = source('lib/utils/logger');

const app = express();

app.use(helmet());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// home page so you can see that this is running
app.get('/', (req, res) => {
    res.render('home', {clientID: Bot.client.user.id});
});

// So Kaffeine can ping the application
app.get('/status', (req, res) => {
    res.status(204).end(); // no content but status okay
});

app.get('/authorize', (req, res) => {
    const userid = req.query.state;
    const { code } = req.query;
    let error = req.query.error || 'Missing the userid and the authentication code';

    if (userid && code) {
        getSpotifyAuthToken(userid, code);
        error = null;
    }

    return res.render('authenticate', {
        error,
    });
});

let port = process.env.PORT;
if (port == null || port === '') {
    port = 8300;
}

app.listen(port, () => {
    Bot.client.login(process.env.DISCORD_TOKEN);
    logger.log(`Server started on port ${port}`);
});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
})
    .then((r) => logger.log(`Successfully connected to MongoDB: ${r}`))
    .catch((e) => logger.log(`Error starting up mongo: ${e}`));
