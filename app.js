// app.js
// ======

require("dotenv").config();
const express = require("express");
var exphbs  = require('express-handlebars');

const Bot = require("./lib/bot");
const {getSpotifyAuthToken} = require("./lib/spotify/spotifyApi");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// home page so you can see that this is running
app.get("/", function (req, res) {
    res.render('home');
});

// So Kaffeine can ping the application
app.get("/status", function (req, res) {
    res.status(204).end();        // no content but status okay
});

app.get("/authorize", function (req, res) {
    let userid = req.query.state;
    let code = req.query.code;
    let error = req.query.error || "Missing the userid and the authentication code";

    if (userid && code) {
        getSpotifyAuthToken(userid, code);
        error = null;
    }

    return res.render('authenticate', {error: error});
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8300;
}

app.listen(port, function () {
    Bot.client.login(process.env.DISCORD_TOKEN);
    console.log("Server started on port " + port);
});
