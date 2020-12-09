// mentalHealth.js
// ===============

function mentalHealthCommand(message) {
    message.channel.send(mentalHealthCommandMessage.toString())
        .then(r => console.log("Successfully completed mental-health command: " + r) )
        .catch(e => console.log("Error: could not execute mental-health command: " + e));
}

function mentalHealthCommandMessage() {
    return "Mental health resources: https://www.ccmhs-ccsms.ca/mental-health-resources-1\n" +
        "Mental health services: https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html\n" +
        "Information on mental illnesses, disorders and diseases: https://www.canada.ca/en/public-health/topics/mental-illness.html\n" +
        "About suicide, prevention, risk factors, how to get help when you or someone you know is in need: https://www.canada.ca/en/public-health/services/suicide-prevention.html\n" +
        "Information on mental health and ways to improve it at work and in your daily life: https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html\n"
}

module.exports = {
    mentalHealthCommand: mentalHealthCommand
};