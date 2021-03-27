const source = require('rfr');
const fs = require('fs');
const os = require('os');
const Agenda = require('agenda');

const agenda = new Agenda({
    db: {
        address: process.env.DATABASE_URL,
    },
});
agenda.name(`${os.hostname}-${process.pid}`);
agenda.processEvery('5 minute');

const jobs = fs.readdirSync('./scheduler/jobs');
jobs.forEach((file) => source(`scheduler/jobs/${file}`)(agenda));

module.exports = agenda;
