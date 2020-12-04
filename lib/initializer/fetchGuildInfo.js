// fetchGuildInfo.js
// =================

module.exports = {
    fetchGuildInfo: function (client, guildID) {
        client.guilds.fetch(guildID)
            .then(guild => console.log("Connected to server: " + guild.name + ", id: " + guild.id + "\nMember Count: " + guild.memberCount))
            .catch(e => Console.log("Error: encountered error when fetching guilds | " + e));
    }
};
