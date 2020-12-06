module.exports = {
    pingCommand: function (message) {
        message.channel.send("Pong")
            .then(r => console.log("Successfully completed ping command: " + r))
            .catch(e => console.log("Error: could not execute ping command: " + e));
    }
};