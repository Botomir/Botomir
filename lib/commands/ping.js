module.exports = {
    pingCommand: function (message) {
        message.channel.send("Pong")
            .then(r => "Successfully completed ping command: " + r)
            .catch(e => "Error: could not execute ping command: " + e);
    }
};