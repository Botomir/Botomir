// app.js
// ======

require("dotenv").config();
const express = require("express");
const Bot = require("./lib/bot");
const {getSpotifyAuthToken} = require("./lib/spotify/spotifyApi");

const app = express();

// So Kaffeine can ping the application
app.get("/", function (req, res) {
    res.render("<h1>Hello world!</h1>");
});


app.get("/authorize", function (req, res) {
    let userid = req.query.state;
    let code = req.query.code;
    let error = req.query.error;

    if (error) {
        console.log("Failed to authenticate: " + error);
        return res.render("<h1>Failed to authenticate. You can now close this window.</h1");
    }

    getSpotifyAuthToken(userid, code);

    res.render("<h1>Successfully authenticated, you can now close this window.</h1>");
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8300;
}

app.listen(port, function () {
    Bot.client.login(process.env.DISCORD_TOKEN);
    console.log("Server started on port " + port);
});
