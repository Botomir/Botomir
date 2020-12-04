// app.js
// ======

require("dotenv").config();
const express = require("express");
const Bot = require("./lib/bot");

const app = express();

// So Kaffeine can ping the application
app.get("/", function (req, res) {
    res.render("<h1>Hello world!</h1>h1>");
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8300;
}

app.listen(port, function () {
    Bot.client.login(process.env.DISCORD_TOKEN);
    console.log("Server started on port " + port);
});
