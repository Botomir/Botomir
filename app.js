// app.js
// ======

require("dotenv").config();
require("ejs");
const express = require("express");
const {client} = require("./static/js/bot");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("<h1>Hello world!</h1>h1>");
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8300;
}

app.listen(port, function () {
    client.login(process.env.DISCORD_TOKEN);
    console.log("Server started on port " + port);
});
