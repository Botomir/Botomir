require('dotenv').config();
const source = require('rfr');
const express = require('express');

const logger = source('lib/utils/logger');
const HomeController = source('controllers/homeController');
const DocsController = source('controllers/docsController');
const SpotifyController = source('controllers/spotifyController');
const NotFoundController = source('controllers/notFoundController');

const router = express();

router.use((req, res, next) => {
    logger.http(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
});

router.get('/', HomeController.get);
router.get('/documentation', DocsController.get);
router.get('/authorize', SpotifyController.get);
router.use(NotFoundController.get);

module.exports = router;
