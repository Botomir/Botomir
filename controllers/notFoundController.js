const NotFoundController = {
    get(req, res) {
        res.render('404');
    },
};

module.exports = NotFoundController;