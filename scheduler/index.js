const source = require('rfr');
const fs = require('fs');
const os = require('os');
const { Agenda, InMemoryNotificationChannel } = require('agenda');
const { MongoBackend } = require('@agendajs/mongo-backend');

const agenda = new Agenda({
    backend: new MongoBackend({
        address: process.env.DATABASE_URL,
        collection: 'scheduledJobs',
    }),
    // run jobs that are due before the next poll right away, like agenda 4 did
    notificationChannel: new InMemoryNotificationChannel(),
});
agenda.name(`${os.hostname()}-${process.pid}`);
agenda.processEvery('5 minute');

const jobs = fs.readdirSync('./scheduler/jobs');
jobs.forEach((file) => source(`scheduler/jobs/${file}`)(agenda));

module.exports = agenda;
