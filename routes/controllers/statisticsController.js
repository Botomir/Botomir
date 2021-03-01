 const StatisticsController = {
    get(req, res) {
        const servers = 10;
        const numCommands = 15;
        const commands = 500;
        const messages = 10000;
        const numRoles = 25;
        const roles = 100;
        const songs = 250;
        const goodBot = 50;
        const badBot = 50;

        res.render('statistics', {
            servers,
            numCommands,
            commands,
            messages,
            numRoles,
            roles,
            songs,
            goodBot,
            badBot,
        });
    },
};

module.exports = StatisticsController;
