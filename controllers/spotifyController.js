const source = require('rfr');
const {getSpotifyAuthToken} = source('lib/spotify/spotifyApi');

const SpotifyController = {
    get(req, res) {
        const userid = req.query.state;
        const {code} = req.query;
        let error = req.query.error || 'Missing the userid and the authentication code';

        if (userid && code) {
            getSpotifyAuthToken(userid, code);
            error = null;
        }

        return res.render('authenticate', {
            error,
        });
    },
};

module.exports = SpotifyController;