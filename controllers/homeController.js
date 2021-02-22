const HomeController = {
    get(req, res, Bot) {
        res.render('home', {
            clientID: Bot.client.user.id,
        });
    },
};

module.exports = HomeController;