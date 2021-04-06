const HomeController = {
    get(req, res) {
        res.render('home', {
            clientID: process.env.DISCORD_CLIENT_ID,
        });
    },
};

module.exports = HomeController;
