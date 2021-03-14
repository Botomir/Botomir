require('dotenv').config();
const source = require('rfr');
const express = require('express');

const HomeController = require('./controllers/homeController');
const DocsController = require('./controllers/docsController');
const StatisticsController = require('./controllers/statisticsController');
const SpotifyController = require('./controllers/spotifyController');
const NotFoundController = require('./controllers/notFoundController');
const AboutController = require('./controllers/aboutController');
const { SettingsController, ConfigController } = require('./controllers/settingsController');

const logger = source('bot/utils/logger');

const router = express();

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.cookie('redirect_uri', req.path);
    return res.redirect('/login');
}

// do logging
router.use((req, res, next) => {
    logger.http(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
});

router.get('/', HomeController.get);
router.get('/documentation', DocsController.get);
router.get('/statistics', StatisticsController.get);
router.get('/authorize', SpotifyController.get);
router.get('/about', AboutController.get);
router.get('/settings', checkAuth, SettingsController.get);
router.get('/configure', checkAuth, ConfigController.get);

router.use(NotFoundController.get);

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
    logger.error(err);

    res.status(500).send({
        error: 'Something failed!',
    });
});

module.exports = router;
