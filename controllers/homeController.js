const source = require('rfr');

const Bot = source('lib/bot');

const HomeController = {
    get(req, res) {
        res.render('home', {
            clientID: Bot.client.user.id,
        });
    },
};

module.exports = HomeController;
