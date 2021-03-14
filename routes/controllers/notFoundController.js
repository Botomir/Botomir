const source = require('rfr');

const logger = source('bot/utils/logger');

const NotFoundController = {
    get(req, res) {
        logger.warn(`page not found '${req.path}' is not a valid path`);
        res.render('404');
    },
};

module.exports = NotFoundController;
