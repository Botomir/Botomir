// util.js
// =======

// this is asyncronous but will handle its own errors.
// it channel can be anything that implemnts .send(message).
function sendMessage(channel, message) {
    channel.send(message)
        .then(r => console.log("Successfully sent message: ", + r))
        .catch(e => console.log("Error: could not send message: ", e));
}

module.exports = {
    sendMessage: sendMessage
};
